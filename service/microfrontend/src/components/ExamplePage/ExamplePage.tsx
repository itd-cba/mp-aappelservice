import { useViewConfig, ViewConfigHookResult, ViewConfigPanel } from '@meisterplan/configcentipede-wrapper';
import { ExamplePageProps } from '@meisterplan/templaniantiger-wrapper';
import { Breadcrumb, ButtonToolbar, OutlinedMenuButton, Page, PageContent, PageHeader, Subheading, ToolbarArea, ToolbarButton } from '@meisterplan/ui-react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigationBlock } from '@meisterplan/appaxolotl-api';
import { getApi } from '@meisterplan/appaxolotl-api/build/lib/api';

const VIEW_KEY = 'examplePage';

type ExampleViewConfig = { avatarVisible: boolean; zoomLevelMonthly: boolean; hideSomeColumns: boolean };

const DEFAULT_CONFIG: ExampleViewConfig = { avatarVisible: true, zoomLevelMonthly: true, hideSomeColumns: true };

export const ExamplePage: React.FunctionComponent<ExamplePageProps> = () => {
  const configResult = useViewConfig<ExampleViewConfig>({ viewKey: VIEW_KEY, autoSave: false });

  const [configStateUpdateAndHandlerEvents, setConfigStateUpdateAndHandlerEvents] = useState<{ type: string; value: string }[]>(() =>
    configResult?.currentConfig ? [{ type: 'status update', value: JSON.stringify(configResult?.currentConfig) }] : []
  );
  useEffect(() => {
    if (configResult?.currentConfig)
      setConfigStateUpdateAndHandlerEvents((prev) => [...prev, { type: 'state update', value: JSON.stringify(configResult.currentConfig) }]);
  }, [configResult?.currentConfig, setConfigStateUpdateAndHandlerEvents]);

  const navigation = useNavigationBlock('examplepage');
  const [location, setLocation] = useState(getApi().navigation.getLocation());
  const [blockingStateOnly, setBlockingStateOnly] = useState(false);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [focusKey, setFocusKey] = useState<string>();

  return (
    <Page>
      <PageHeader>
        <Grid direction="row" container>
          <Breadcrumb path={[{ name: 'TemplanianTiger' }]} />
          <ViewConfigPanel viewKey={VIEW_KEY} />
        </Grid>
        <ToolbarArea>
          <ButtonToolbar>
            <ToolbarButton text="Add" onClick={() => {}} IconComponent={AddIcon} elementName="AddButton" />
            <ToolbarButton text="Search" onClick={() => {}} IconComponent={SearchIcon} elementName="SearchButton" />
            <OutlinedMenuButton
              id="SettingsButton"
              label="Only for UI Finetuning"
              menuItems={[
                // eslint-disable-next-line no-alert
                { text: 'Dummy 1', onClick: () => window.alert('Clicked on Dummy 1') },
                // eslint-disable-next-line no-alert
                { text: 'Dummy 2', onClick: () => window.alert('Clicked on Dummy 2') },
                // eslint-disable-next-line no-alert
                { text: 'Dummy 3', onClick: () => window.alert('Clicked on Dummy 3') },
              ]}
              value={'Dummy 1'}
            />
            <ToolbarButton text="Feedback" onClick={() => {}} IconComponent={SentimentSatisfiedAltIcon} elementName="FeedbackButton" />
          </ButtonToolbar>
        </ToolbarArea>
      </PageHeader>
      <PageContent containsCards>
        <Grid container spacing={2}>
          <SimpleCard title="ConfigCentipede Example">
            <div style={{ paddingTop: 8 }}>{configResult && <TemplanianTigerContent configResult={configResult} />}</div>
            {configStateUpdateAndHandlerEvents.map((e) => (
              <p>
                <b>{e.type}</b>: <code>{e.value}</code>
              </p>
            ))}
          </SimpleCard>
          <SimpleCard title="WebPack Examples">
            <p>
              <b>Available environment variables</b>
              <pre>
                {Object.keys(process.env)
                  .map((key) => `process.env.${key} = ${process.env[key] ? `"${process.env[key]}"` : undefined}`)
                  .join('\n')}
              </pre>
            </p>
          </SimpleCard>
          <SimpleCard title="Axolotl Navigation Examples">
            <p>
              <b>Location</b>
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={'Pathname'}
                  value={location.pathname}
                  onChange={(e) => setLocation({ ...location, pathname: e.target.value })}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label={'Hash'} value={location.hash} onChange={(e) => setLocation({ ...location, hash: e.target.value })} fullWidth={true} />
              </Grid>
              <Grid item xs={12}>
                <TextField label={'State'} value={location.state} onChange={(e) => setLocation({ ...location, state: e.target.value })} fullWidth={true} />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Query Params</FormLabel>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: '45%' }}>Key</TableCell>
                        <TableCell style={{ width: '45%' }}>Value</TableCell>
                        <TableCell align={'right'} style={{ width: '10%' }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {Object.entries(location.queryParams)
                      .sort(([k1, v1], [k2, v2]) => k1.localeCompare(k2))
                      .map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>
                            <TextField
                              value={key}
                              onChange={(e) => {
                                const { [key]: oldValue, ...remainder } = location.queryParams;
                                setLocation({ ...location, queryParams: { ...remainder, [e.target.value]: oldValue } });
                                setFocusKey(e.target.value);
                              }}
                              fullWidth={true}
                              autoFocus={focusKey ? focusKey === key : undefined}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={value}
                              onChange={(e) => setLocation({ ...location, queryParams: { ...location.queryParams, [key]: e.target.value } })}
                              fullWidth={true}
                            />
                          </TableCell>
                          <TableCell align={'right'}>
                            <Button
                              onClick={() => {
                                const { [key]: oldValue, ...remainder } = location.queryParams;
                                setLocation({ ...location, queryParams: remainder });
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableCell>
                        <TextField value={newKey} onChange={(e) => setNewKey(e.target.value)} fullWidth={true} />
                      </TableCell>
                      <TableCell>
                        <TextField value={newValue} onChange={(e) => setNewValue(e.target.value)} fullWidth={true} />
                      </TableCell>
                      <TableCell align={'right'}>
                        <Button
                          disabled={!newKey}
                          onClick={() => {
                            setLocation({ ...location, queryParams: { ...location.queryParams, [newKey]: newValue } });
                            setNewKey('');
                            setNewValue('');
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <p>
              <b>Actions</b>
            </p>
            <ButtonGroup>
              <Button variant="contained" onClick={() => getApi().navigation.push(location)}>
                Push
              </Button>
              <Button variant="contained" onClick={() => getApi().navigation.replace(location)}>
                Replace
              </Button>
            </ButtonGroup>
            <br />
            <br />
            <ButtonGroup>
              <Button variant="contained" onClick={() => navigation.block({ ignoreStateOnlyChanges: blockingStateOnly })}>
                Block
              </Button>
              <Button variant="contained" onClick={() => navigation.unblock()}>
                Unblock
              </Button>
            </ButtonGroup>
            <Checkbox checked={blockingStateOnly} onChange={(e) => setBlockingStateOnly(e.target.checked)} /> ignore state-only changes for blocking
          </SimpleCard>
        </Grid>
      </PageContent>
    </Page>
  );
};

const TemplanianTigerContent: React.FC<{ configResult: ViewConfigHookResult<ExampleViewConfig> }> = ({ configResult }) => {
  switch (configResult.currentConfig.type) {
    case 'loading':
      return <>Loading...</>;
    case 'error':
      return <>Could not load config</>;
    case 'loaded': {
      if (configResult.currentConfig.config) {
        return (
          <ExampleValueEditor
            value={'avatarVisible' in configResult.currentConfig.config ? configResult.currentConfig.config : DEFAULT_CONFIG}
            onChange={(config) => configResult.updateCurrentConfig(config)}
          />
        );
      } else {
        return (
          <>
            <p>There is no View Config available. The view should use its default config or show an onboarding screen.</p>
            <ExampleValueEditor value={DEFAULT_CONFIG} onChange={(config) => configResult.updateCurrentConfig(config)} />
          </>
        );
      }
    }
  }
};

const ExampleValueEditor: React.FC<{ value: ExampleViewConfig; onChange: (value: ExampleViewConfig) => void }> = (props) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            data-tid="AvatarVisibleCheckbox"
            checked={props.value.avatarVisible}
            onChange={(_, checked) => props.onChange({ ...props.value, avatarVisible: checked })}
          />
        }
        label="Avatar Visible"
      />
      <FormControlLabel
        control={
          <Checkbox
            data-tid="HideSomeColumnsCheckbox"
            checked={props.value.hideSomeColumns}
            onChange={(_, checked) => props.onChange({ ...props.value, hideSomeColumns: checked })}
          />
        }
        label="Hide some columns"
      />
      <FormControlLabel
        control={
          <Checkbox
            data-tid="ZoomLevelCheckbox"
            checked={props.value.zoomLevelMonthly}
            onChange={(_, checked) => props.onChange({ ...props.value, zoomLevelMonthly: checked })}
          />
        }
        label="Zoom Level: monthly"
      />
    </>
  );
};

const SimpleCard: React.FC<{ title: string } & React.PropsWithChildren> = (props) => {
  return (
    <Grid item={true} xs={4}>
      <Card>
        <CardHeader title={<Subheading gutterBottom={false}>{props.title}</Subheading>} />
        <CardContent>{props.children}</CardContent>
      </Card>
    </Grid>
  );
};
