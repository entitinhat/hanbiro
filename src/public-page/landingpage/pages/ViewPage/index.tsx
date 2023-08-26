import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

import RawHTML from '@base/components/@hanbiro/RawHTML';
import { useStorageDownloadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';

import { extractUrlParams } from '@public-page/landingpage/utils';
import { useLandingPage } from '@public-page/landingpage/hooks/useLandingPage';
import useRenderFormContent from '@public-page/landingpage/hooks/useRenderFormContent';
import { getGeneratedPageURL } from '@settings/digital/utils';

interface ViewPageProps {
  param?: string;
}
const ViewPage = (props: ViewPageProps) => {
  const { param } = props;

  //Example Token: RD0yNjA5MWYzMC03NmY3LTQ3NTYtODRiOC1kYTQ0MDBkZDA2NDkmUD0mUz0mQz0mVT0mVD0mTz0=
  // extract params
  const publicParams = extractUrlParams(param);

  // get data from public api
  const { data: landingPageData, refetch, isLoading: isLandingPageLoading } = useLandingPage(publicParams?.tk, publicParams?.id);

  //I use the containerRef to find and replace current select element with form element
  const containerRef = useRef<any>();

  const [formDownloadIds, setFormDownloadIds] = useState<string[] | null>(null);
  const [landingPageHtml, setLandingPageHtml] = useState<null | { html: string; css: string }>(null);
  const [finalSource, setFinalSource] = useState<null | string>(null);

  //Get html data from html key
  const mStorageDownload: any = useStorageDownloadMutation<BaseMutationResponse>({
    onSuccess: (data: any, variables: any, context: any) => {
      // console.log('data', data);
      // console.log('landing page data', JSON.parse(data));
      if (publicParams.readOnly == 'readOnly') {
        const htmlStr = JSON.parse(data).html;

        // make a new parser
        const parser = new DOMParser();

        // convert html string into DOM
        containerRef.current = parser.parseFromString(htmlStr, 'text/html');
      }

      setLandingPageHtml(JSON.parse(data));
    },
    onError: (error: any, variables: any, context: any) => {
      // console.log('There is an error during uploading: ' + JSON.parse(error).message);
    }
  });

  // Get Html data (landing page) form server by html key
  useEffect(() => {
    if (landingPageData && landingPageData.html) {
      const htmlKey = landingPageData.html;
      // console.log('html Key', htmlKey);
      const params = {
        filename: htmlKey,
        module: 'landingpage'
      };
      mStorageDownload.mutate(params);
    }
  }, [landingPageData]);

  //@TODO: set readonly from param
  //publicParams.readOnly == 'readOnly'
  const { isFinished, newSource } = useRenderFormContent(formDownloadIds, containerRef.current, {
    readOnly: publicParams.readOnly == 'readOnly',
    token: publicParams?.tk
  });

  //Find id from select form html data of landing page
  useEffect(() => {
    if (landingPageHtml) {
      const node = containerRef.current;
      if (node) {
        //Get All id to parse HTML
        const formNode = [...node.getElementsByClassName('form-select')];
        let newformIds: string[] = [];
        var formArr = Array.from(formNode ?? []);

        formArr.map((node: Element) => {
          const source = node.getAttribute('source') ?? '';
          const fileId = node.getAttribute('source')?.split(':')[1];
          const modules = source.substring(source.indexOf('@') + 1, source.indexOf(':'));
          // console.log('Test fileId', fileId);
          // console.log('Test source', modules);
          if (modules == 'ticketform' && fileId) {
            newformIds.push(fileId);
          }
        });

        if (newformIds.length === 0 && publicParams.readOnly == 'readOnly' && newformIds.length === 0) {
          const nFinalSource = getGeneratedPageURL({ html: landingPageHtml.html, css: landingPageHtml.css, scale: 0.9 });
          setFinalSource(nFinalSource);
        }
        setFormDownloadIds([...newformIds]);
        // console.log('Test source', newformIds);
        // setFormDownloadNodes(formNode);
      }
    }
  }, [JSON.stringify(landingPageHtml)]);

  useEffect(() => {
    if (newSource) {
      setFinalSource(newSource);
    }
  }, [newSource]);
  //=======================================================Debugger==================================================================
  // console.log('finalSource', finalSource, newSource);
  //=====================================================================================================================================
  return (
    <React.Suspense fallback={<LoadingCircular loading={isLandingPageLoading && !landingPageHtml} />}>
      <LoadingCircular loading={isLandingPageLoading && !landingPageHtml} />
      <Box
        sx={{
          visibility: isFinished || (formDownloadIds && formDownloadIds.length == 0) ? `visible` : `hidden`,
          position: 'relative'
        }}
      >
        {finalSource && publicParams.readOnly == 'readOnly' && (
          <iframe
            className="scroll-box"
            style={{
              minHeight: '100vh',
              // height: 'calc(100vh - 380px)',
              width: '100%',
              border: 0,
              overflow: 'auto !important',
              pointerEvents: 'none'
            }}
            src={finalSource}
          />
        )}
        {landingPageHtml && publicParams.readOnly !== 'readOnly' && (
          <Box ref={containerRef}>
            <RawHTML nl2br={false}>
              {`<!DOCTYPE html>
        <html>
          <head><style>${landingPageHtml?.css}</style></head>
          <body>
            ${landingPageHtml?.html}
          </body>
        </html>
      `}
            </RawHTML>
          </Box>
        )}
      </Box>
    </React.Suspense>
  );
};

export default ViewPage;
