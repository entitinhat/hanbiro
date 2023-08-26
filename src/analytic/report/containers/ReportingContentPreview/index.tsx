import { REPORT_REPORTING_CONTENT } from '@analytic/report/config/keyNames';
import viewFieldsConfig from '@analytic/report/config/view-field';
import { useReportView } from '@analytic/report/hooks/useReportView';
import { CircularProgress } from '@mui/material';
import React from 'react';
import ReportingContentView from '../ReportingContentView';

interface ReportingContentPreviewProps {
  value: {
    id: string;
    [x: string]: any;
  };
}

const ReportingContentPreview: React.FC<ReportingContentPreviewProps> = (props: ReportingContentPreviewProps) => {
  const {
    value: { id }
  } = props;

  const schemaStr = viewFieldsConfig[REPORT_REPORTING_CONTENT]?.schema ?? '';

  const { data, isFetching } = useReportView(schemaStr, { id: id, preview: true });
  const reportingContentViewProps = {
    dateRange: data?.dateRange ?? '',
    value: data ?? { pages: [] }
  };

  return (
    <>
      {isFetching && <CircularProgress />}
      {!isFetching && <ReportingContentView {...reportingContentViewProps} />}
    </>
  );
};

export default ReportingContentPreview;
