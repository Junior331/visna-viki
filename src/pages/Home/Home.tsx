/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import {
  Select,
  MenuItem,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl
} from '@mui/material';
import { Header } from '@/components/modules';
import { Layout } from '@/components/organism';
import { Card } from '@/components/modules';
import { mocks } from '@/services/mocks';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { getProjects } from './services';
import * as S from './HomeStyled';

export const Home = () => {
  const [option, setOption] = useState('');
  const { setSnackbar } = useContext(SnackbarContext);

  const listProjects = async () => {
    try {
      const result = await getProjects();
      console.log('result ::', result);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbar({
          isOpen: true,
          severity: 'error',
          vertical: 'bottom',
          horizontal: 'left',
          message: error.message
        });
      }
    }
  };

  useEffect(() => {
    listProjects();
  }, []);

  return (
    <Layout>
      <S.HomeContainer>
        <Header />
        <S.Content>
          <S.Header>
            <S.Title>Projetos</S.Title>
            <S.ContainerFilter>
              <FormControl sx={{ m: 1, minWidth: 120, minHeight: 40 }}>
                <Select
                  displayEmpty
                  value={option}
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={(event) => setOption(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select filter
                  </MenuItem>
                  <MenuItem value={1}>Ten</MenuItem>
                  <MenuItem value={2}>Twenty</MenuItem>
                  <MenuItem value={3}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Input
                fullWidth
                id="search"
                variant="outlined"
                // value={values.password}
                // onChange={handleChange}
                typeElement={OutlinedInput}
                placeholder="Digite aqui...."
                inputProps={{ style: { fontSize: '1.4rem' } }}
                type={'text'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button size="200px"> Novo Projeto</Button>
            </S.ContainerFilter>
          </S.Header>
          <S.ContainerCards>
            {mocks.projects.map((data) => (
              <Card
                key={data.id}
                name={data.name}
                text={data.text}
                status={data.status}
                progress={data.progress}
              />
            ))}
          </S.ContainerCards>
        </S.Content>
      </S.HomeContainer>
    </Layout>
  );
};
