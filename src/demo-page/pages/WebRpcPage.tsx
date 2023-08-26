import MainCard from '@base/components/App/MainCard';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Client } from '@third-party/webrpc-ts/src/client';
import { ClientRpcOptions, RpcMetaData, RpcRequest } from '@third-party/webrpc-ts/src/type';
import _ from 'lodash';
import { useState } from 'react';

enum RequestType {
  UNARRY = 'unarry',
  CLIEINT = 'client',
  SERVER = 'server',
  BIDI = 'bidi'
}
enum DirectionType {
  IN = 1,
  OUT = 2
}
interface Message {
  type: RequestType;
  data: string;
  direction: DirectionType;
}

interface WebRpcPageProps {}
const clientOptions: ClientRpcOptions = {
  host: 'api.habin.io:443',
  secure: true,
  streamEndPoint: '/examples.time.Time/ws'
};
const grpcClient = new Client(clientOptions);
const WebRpcPage = (props: WebRpcPageProps) => {
  const [result, setResult] = useState<Message[]>([]);
  const newData = () => {
    return {
      now: new Date().toISOString()
    };
  };

  const handleUnarry = async () => {
    const req: RpcRequest = {
      data: newData()
    };
    result.push({
      type: RequestType.UNARRY,
      data: JSON.stringify(req),
      direction: DirectionType.IN
    });

    const res = await grpcClient.unarry('/examples.time.Time/Unary', req);
    result.push({
      type: RequestType.UNARRY,
      data: JSON.stringify(res),
      direction: DirectionType.OUT
    });
    setResult([...result]);
  };
  const handleClientStream = async () => {
    const headers: RpcMetaData = {};
    const url = '/examples.time.Time/ClientStream';
    const stream = grpcClient.clientStream(url, headers);
    // send
    const req: RpcRequest = {
      data: newData()
    };
    result.push({
      type: RequestType.CLIEINT,
      data: JSON.stringify(req),
      direction: DirectionType.IN
    });
    setResult([...result]);
    // do send message
    stream.send(req);
    stream.send(req);

    stream.finishSend();
    const res = await stream.receive();
    console.log('receive', res);
    // closeAndReceive
    if (res.data) {
      const messages = _.isArray(res.data) ? res.data : [res.data];
      messages.map((msg) => {
        result.push({
          type: RequestType.CLIEINT,
          data: JSON.stringify(msg),
          direction: DirectionType.OUT
        });
      });
    }
    if (res.error) {
      // show error
      result.push({
        type: RequestType.CLIEINT,
        data: JSON.stringify(res.error),
        direction: DirectionType.OUT
      });
    }

    setResult([...result]);
  };
  const handleServerStream = async () => {
    const headers: RpcMetaData = {};
    const url = '/examples.time.Time/ServerStream';
    const req: RpcRequest = {
      data: newData()
    };
    result.push({
      type: RequestType.SERVER,
      data: JSON.stringify(req),
      direction: DirectionType.IN
    });
    setResult([...result]);
    const stream = grpcClient.serverStream(url, req, headers);
    // wait receive data
    const res = await stream.receive();
    console.log('receive', res);
    // closeAndReceive
    if (res.data) {
      const messages = _.isArray(res.data) ? res.data : [res.data];
      messages.map((msg) => {
        result.push({
          type: RequestType.SERVER,
          data: JSON.stringify(msg),
          direction: DirectionType.OUT
        });
      });
    }
    if (res.error) {
      // show error
      result.push({
        type: RequestType.SERVER,
        data: JSON.stringify(res.error),
        direction: DirectionType.OUT
      });
    }

    setResult([...result]);
  };
  const handleBidi = async () => {
    const headers: RpcMetaData = {};
    const url = '/examples.time.Time/Stream';
    const stream = grpcClient.stream(url, headers);
    // send
    const req: RpcRequest = {
      data: newData()
    };
    result.push({
      type: RequestType.BIDI,
      data: JSON.stringify(req),
      direction: DirectionType.IN
    });
    setResult([...result]);
    // do send message
    stream.send(req);
    stream.send(req);

    stream.finishSend();
    const res = await stream.receive();
    console.log('receive', res);
    // closeAndReceive
    if (res.data) {
      const messages = _.isArray(res.data) ? res.data : [res.data];
      messages.map((msg) => {
        result.push({
          type: RequestType.BIDI,
          data: JSON.stringify(msg),
          direction: DirectionType.OUT
        });
      });
    }
    if (res.error) {
      // show error
      result.push({
        type: RequestType.BIDI,
        data: JSON.stringify(res.error),
        direction: DirectionType.OUT
      });
    }

    setResult([...result]);
  };
  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item columns={6}>
            <MainCard sx={{ height: '500px' }}>
              <Stack spacing={2}>
                <Stack>
                  <Button size="small" onClick={handleUnarry} variant="contained">
                    Call Unarry
                  </Button>
                </Stack>
                <Stack>
                  <Button size="small" variant="contained" onClick={handleClientStream}>
                    Client Stream
                  </Button>
                </Stack>
                <Stack>
                  <Button size="small" variant="contained" onClick={handleServerStream}>
                    Sever Stream
                  </Button>
                </Stack>
                <Stack>
                  <Button size="small" variant="contained" onClick={handleBidi}>
                    Bidi
                  </Button>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
          <Grid item columns={6}>
            <MainCard sx={{ height: '500px', width: '600px', overflow: 'auto' }}>
              Result:
              <Box>
                {result.map((item, index) => {
                  return (
                    <Stack direction={'row'} key={index} spacing={2}>
                      <Stack>
                        {item.direction === DirectionType.IN ? (
                          <ArrowUpwardOutlined color="primary" />
                        ) : (
                          <ArrowDownwardOutlined color="error" />
                        )}
                      </Stack>
                      <Stack>{item.type}</Stack>
                      <Stack>{item.data}</Stack>
                    </Stack>
                  );
                })}
              </Box>
            </MainCard>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default WebRpcPage;
