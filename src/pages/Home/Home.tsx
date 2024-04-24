import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import {
  Select,
  MenuItem,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Skeleton
} from '@mui/material';
import { mocks } from '@/services/mocks';
import { Card } from '@/components/modules';
import { projectType } from '@/utils/types';
import { emptyProject } from '@/utils/emptys';
import { Header } from '@/components/modules';
import { Layout } from '@/components/organism';
import { SearchContext } from '@/contexts/Search';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { listProjects, handleFilterAndSearch } from './utils';
import * as S from './HomeStyled';

export const Home = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState('');
  const { setSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState<boolean>(true);
  const { setContentActive } = useContext(SearchContext);
  const [list, setList] = useState<Array<projectType>>([emptyProject]);
  const [filteredList, setFilterList] = useState<Array<projectType>>(list);

  useEffect(() => {
    handleFilterAndSearch({ option, list, setFilterList });
  }, [list, option]);

  useEffect(() => {
    setFilterList(list);
  }, [list]);

  useEffect(() => {
    listProjects({ setList, setLoading, setSnackbar });
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
                  <MenuItem value={''}>All</MenuItem>
                  <MenuItem value={'Block'}>Block</MenuItem>
                  <MenuItem value={'Done'}>Done</MenuItem>
                  <MenuItem value={'To Do'}>To Do</MenuItem>
                  <MenuItem value={'In Review'}>In Review</MenuItem>
                  <MenuItem value={'In Progress'}>In Progress</MenuItem>
                </Select>
              </FormControl>
              <Input
                fullWidth
                id="search"
                variant="outlined"
                onChange={({ target }) =>
                  handleFilterAndSearch({
                    list,
                    option,
                    setFilterList,
                    setContentActive,
                    value: target.value
                  })
                }
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
              <Button size="200px" onClick={() => navigate('/create')}>
                {' '}
                Novo Projeto
              </Button>
            </S.ContainerFilter>
          </S.Header>
          <S.ContainerCards>
            {loading ? (
              <>
                {mocks.projects.slice(0, 7).map(() => (
                  <S.StackSkeleton>
                    <S.HeaderSkeleton>
                      <Skeleton
                        width={100}
                        title="Jaja"
                        variant="text"
                        sx={{ fontSize: '1rem', maxWidth: '30%' }}
                      />
                      <Skeleton
                        width={100}
                        variant="text"
                        sx={{ fontSize: '1rem', maxWidth: '20%' }}
                      />
                    </S.HeaderSkeleton>

                    <Skeleton height={124} width={'100%'} variant="rounded" />

                    <Skeleton height={80} width={'100%'} variant="rounded" />

                    <S.FooterSkeleton>
                      <Skeleton
                        width={100}
                        variant="text"
                        sx={{ fontSize: '1rem', maxWidth: '50%' }}
                      />
                      <Skeleton variant="rounded" width={'100%'} height={10} />
                    </S.FooterSkeleton>
                  </S.StackSkeleton>
                ))}
              </>
            ) : (
              <>
                {filteredList.map((data) => (
                  <Card
                    key={data.id}
                    name={data.name}
                    text={data.text}
                    status={data.status}
                    progress={data.progress}
                  />
                ))}
              </>
            )}
          </S.ContainerCards>
        </S.Content>
      </S.HomeContainer>
    </Layout>
  );
};
