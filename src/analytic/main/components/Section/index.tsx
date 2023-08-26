import React, {useEffect} from "react";
import MainCard from "@base/components/App/MainCard";
import {Section as ISection} from "@analytic/main/types/interfaces/section";
import ChartGrid from "@analytic/main/components/ChartGrid";
import {Theme} from "@mui/material/styles";
import {ChartBoxProps} from "@analytic/main/components/ChartBox";
import {Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
interface SectionProps extends ISection {
  charts: ChartBoxProps[];
  onDOMLoaded?: (is: boolean) => void;
}

const Section: React.FC<SectionProps> = (props: SectionProps) => {
  const {
    title,
    charts,
    onDOMLoaded
  } = props;

  const { t } = useTranslation()
  useEffect(() => {
    onDOMLoaded && onDOMLoaded(true)
  }, []);

  return (
    <MainCard
      sx={{backgroundColor: (theme: Theme) => theme.palette.background.paper}}
      title={<Typography variant="h4">{t(title)}</Typography>}
      divider={false}
      headerSX={{
        pb: 0
      }}
    >
      <ChartGrid chartBoxes={charts}/>
    </MainCard>
  );
};

export default Section;