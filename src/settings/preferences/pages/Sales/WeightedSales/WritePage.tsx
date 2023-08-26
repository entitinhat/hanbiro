import { useMemo, useState } from 'react';

import {
  Button,
  Grid,
  InputLabel,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { WeightedSalesPipeline } from '../json';

interface Props {
  isOpen: boolean;
  onClose: any;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose } = props;

  //Temp data
  const [formValue, setFormValue] = useState<any>(WeightedSalesPipeline);
  const theme = useTheme();

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              size="small"
              loading={false}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={() => {
                // handleSave(writeType);
              }}
              disabled={false}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  //handlers
  const handleAddProbability = (stageIdx: number, statusIdx: number) => {
    let nVal = [...formValue];
    nVal[stageIdx].status[statusIdx].probability = 0;
    setFormValue(nVal);
  };
  const handleChangeProbability = (stageIdx: number, statusIdx: number, e: any) => {
    let nVal = [...formValue];
    nVal[stageIdx].status[statusIdx].probability = e.target.value;
    setFormValue(nVal);
  };
  const handleDeleteProbability = (stageIdx: number, statusIdx: number) => {
    let nVal = [...formValue];
    nVal[stageIdx].status[statusIdx].probability = null;
    setFormValue(nVal);
  };

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_setting_lead_tab_weighted_sales_pipeline`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
      anchor={'right'}
    >
      <form>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <Typography>
                <SpanLang keyLang="Opportunity Process" textOnly />
              </Typography>

              <Select fullWidth placeholder="Please select" />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <SpanLang keyLang="Stage" textOnly />
                    </TableCell>
                    <TableCell>
                      <SpanLang keyLang="Status" textOnly />
                    </TableCell>
                    <TableCell width="30%">
                      <SpanLang keyLang="Probability" textOnly />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow>
                    <TableCell>{`Qualified`}</TableCell>
                    <TableCell>{`Assigned`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={20} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Open`}</TableCell>
                    <TableCell>{`Open`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={20} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={5}>{`Develop`}</TableCell>
                    <TableCell>{`Needs Analysis`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={30} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Value Proposition`}</TableCell>
                    <TableCell align="center">
                      <AddCircleOutline fontSize={'small'} color="primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Identify Decision M.`}</TableCell>
                    <TableCell align="center">
                      <AddCircleOutline fontSize={'small'} color="primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Identify Competitor`}</TableCell>
                    <TableCell align="center">
                      <AddCircleOutline fontSize={'small'} color="primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Perception Analysis`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={50} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={2}>{`Propose`}</TableCell>
                    <TableCell>{`Proposal`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={70} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Feed back`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={90} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={2}>{`Closed`}</TableCell>
                    <TableCell>{`Won`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={100} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{`Lost`}</TableCell>
                    <TableCell align="right">
                      <TextField id="filled-number" type="number" size="small" value={0} />
                    </TableCell>
                  </TableRow> */}
                  {formValue.map((stage: any, stageIdx: number) => {
                    if (stage.status.length > 0)
                      return (
                        <>
                          <TableRow>
                            <TableCell rowSpan={stage.status.length}>{stage.stage}</TableCell>
                            <TableCell>{stage.status[0].name}</TableCell>
                            <TableCell align="center">
                              {stage.status[0].probability !== null ? (
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                  <RemoveCircleOutline
                                    fontSize={'small'}
                                    color="secondary"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={(e) => {
                                      handleDeleteProbability(stageIdx, 0);
                                    }}
                                  />
                                  <TextField
                                    id="filled-number"
                                    type="number"
                                    size="small"
                                    value={stage.status[0].probability}
                                    onChange={(e) => {
                                      handleChangeProbability(stageIdx, 0, e);
                                    }}
                                  />
                                </Stack>
                              ) : (
                                <AddCircleOutline
                                  sx={{ cursor: 'pointer' }}
                                  // fontSize={'small'}
                                  color="primary"
                                  onClick={(e) => {
                                    handleAddProbability(stageIdx, 0);
                                  }}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                          {stage.status.map((status: any, statusIdx: number) => {
                            if (statusIdx > 0)
                              return (
                                <TableRow>
                                  <TableCell>{status.name}</TableCell>
                                  <TableCell align="center">
                                    {status.probability !== null ? (
                                      <Stack direction="row" spacing={0.5} alignItems="center">
                                        <RemoveCircleOutline
                                          fontSize={'small'}
                                          color="secondary"
                                          onClick={(e) => {
                                            handleDeleteProbability(stageIdx, statusIdx);
                                          }}
                                          sx={{ cursor: 'pointer' }}
                                        />
                                        <TextField
                                          id="filled-number"
                                          type="number"
                                          size="small"
                                          value={status.probability}
                                          onChange={(e) => {
                                            handleChangeProbability(stageIdx, statusIdx, e);
                                          }}
                                        />
                                      </Stack>
                                    ) : (
                                      <AddCircleOutline
                                        sx={{ cursor: 'pointer' }}
                                        // fontSize={'small'}
                                        color="primary"
                                        onClick={(e) => {
                                          handleAddProbability(stageIdx, statusIdx);
                                        }}
                                      />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                          })}
                        </>
                      );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </MiModal>
  );
};

export default WritePage;
