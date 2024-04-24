import { Grid } from '@mui/material';
import * as S from './SummaryFormStyled';

const SummaryForm = () => {
  return (
    <S.SummaryFormContainer>
      <S.Section>
        <S.Title variant="h2" gutterBottom>
          Terreno:
        </S.Title>
        <S.ContainerInfo>
          <Grid container spacing={{ xs: 0, sm: 0 }} rowGap={2} columnGap={1}>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={2.9} minWidth={222}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Terreno:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Projeto teste
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={270}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Endereço:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Rua Vasco Lima
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={175}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Bairro:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Guaratiba
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={110}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    País:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Brasil
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={2.9} minWidth={230}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Estado:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Rio de Janeiro
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={123}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Número:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    02
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={170}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Cep:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    05263-030
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={240}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    240m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={2.9} minWidth={166}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Testada:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    160m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={166}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Topografia
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Plano
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={201}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Valor (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    R$ 31,00
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={295}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Valor total:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    R$ 43,596,397,38
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={2.9} minWidth={320}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Zoneamento:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    Zoneamento (ZM)
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
          </Grid>
        </S.ContainerInfo>
      </S.Section>
      <S.Section>
        <S.Title variant="h2" gutterBottom>
          Unidades:
        </S.Title>
        <S.ContainerInfo>
          <Grid container spacing={{ xs: 0, sm: 0 }} rowGap={2} columnGap={1}>
            <S.ContainerInfo>
              <Grid container rowGap={2}>
                <Grid item xs={12} sm={12} md={3} minWidth={222}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Tipo da unidade:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      Residencial
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={3} minWidth={270}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Quantidade:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      160
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={3} minWidth={175}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Area média:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      160m²
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={3} minWidth={110}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      A. Privativa total:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      160m²
                    </S.Text>
                  </S.ContainerText>
                </Grid>
              </Grid>
              <Grid container rowGap={2}>
                <Grid item xs={12} sm={12} md={1.2} minWidth={150}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Área:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      160m²
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={1.8} minWidth={230}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Qtd permutas:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      4000
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={3} minWidth={110}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Area permutas:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      606m²
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={3} minWidth={110}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      Valor de mercado
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      R$ 32.000
                    </S.Text>
                  </S.ContainerText>
                </Grid>
                <Grid item xs={12} sm={12} md={3} minWidth={110}>
                  <S.ContainerText>
                    <S.Title variant="h6" gutterBottom>
                      VGV líquido:
                    </S.Title>
                    <S.Text variant="body2" gutterBottom>
                      R$ 43.760.192
                    </S.Text>
                  </S.ContainerText>
                </Grid>
              </Grid>
            </S.ContainerInfo>

            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={1.7} minWidth={180}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Pavimentos:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    12
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2} minWidth={280}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Unidades por andar:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    32
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={1.1} minWidth={130}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Subsolos:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    12
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.7} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Unidades total no empreendimento :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    32
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.4} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Total de area privativa :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    32
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={3.7} minWidth={550}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Total de area construída :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    160m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={4.8} minWidth={714}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total a construir (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    5.395m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.4} minWidth={100}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total privativa (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    3.481m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={3.7} minWidth={552}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total privativa sem permuta (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    2.880m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={4.8} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Valor médio de venda (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    14.425m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
          </Grid>
        </S.ContainerInfo>
      </S.Section>
      <S.Section>
        <S.Title variant="h2" gutterBottom>
          Prazos
        </S.Title>
        <S.ContainerInfo>
          <Grid container spacing={{ xs: 0, sm: 0 }} rowGap={2} columnGap={1}>
            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={2.9} minWidth={260}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Data de início:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    13/05/2024
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={345}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Aprovação do projeto :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    12 mes
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={280}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Execução da obra:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    20 mes
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={245}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Prazo total:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    32 mes
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
          </Grid>
        </S.ContainerInfo>
      </S.Section>
    </S.SummaryFormContainer>
  );
};

export { SummaryForm };
