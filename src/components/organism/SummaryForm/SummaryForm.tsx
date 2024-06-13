import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Props } from './@types';
import { MaskType } from '@/utils/types';
import { Button } from '@/components/elements';
import { handleCreateProject } from './services';
import { SnackbarContext } from '@/contexts/Snackbar';
import { formatCurrency, typeMask } from '@/utils/utils';
import * as S from './SummaryFormStyled';
import dayjs from 'dayjs';

const SummaryForm = ({ date, handleStep }: Props) => {
  const navigate = useNavigate();
  const { setSnackbar } = useContext(SnackbarContext);
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
                    {date.lands.name}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={270}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Endereço:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.street}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={175}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Bairro:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.neighborhood}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={110}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    País:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.country}
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
                    {date.lands.state}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={123}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Número:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.number}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={170}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Cep:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {typeMask(MaskType.CEP, date.lands.zipCode)}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={240}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.area}
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
                    {date.lands.frontage}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={320}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Depave
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.depave}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={166}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Topografia
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.topographyTypeId}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={201}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Valor (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    R$ {formatCurrency(date.lands.amountPerMeter.toString())}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={295}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Valor total:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    R$ {formatCurrency(date.lands.totalAmount.toString())}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={320}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Zoneamento:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.lands.zoning}
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
            {date.units.unit.map((unit) => (
              <S.ContainerInfo key={unit.id}>
                <Grid container rowGap={2}>
                  <Grid item xs={12} sm={12} md={3} minWidth={222}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        Tipo da unidade:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        {unit.unitTypeId}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={270}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        Quantidade:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        {unit.unitQuantity}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={175}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        Area média:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        {unit.averageArea}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={110}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        A. Privativa total:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        {unit.areaPrivativaTotal}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                </Grid>
                <Grid container rowGap={2}>
                  <Grid item xs={12} sm={12} md={3} minWidth={222}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        Qtd permutas:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        {unit.exchangeQuantity}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={270}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        Área permutada:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        {unit.areaExchanged}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={175}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        Valor de mercado
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        R$ {formatCurrency(unit.marketAmount)}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={110}>
                    <S.ContainerText>
                      <S.Title variant="h6" gutterBottom>
                        VGV líquido:
                      </S.Title>
                      <S.Text variant="body2" gutterBottom>
                        R$ {formatCurrency(unit.netAmount)}
                      </S.Text>
                    </S.ContainerText>
                  </Grid>
                </Grid>
              </S.ContainerInfo>
            ))}

            <Grid container rowGap={2} columnGap={1}>
              <Grid item xs={12} sm={12} md={3.6} minWidth={280}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Unidades por andar:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.units.unitPerFloor}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.6} minWidth={180}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Pavimentos:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                  {date.units.flooring}
                  </S.Text>
                </S.ContainerText>
              </Grid>

              <Grid item xs={12} sm={12} md={4} minWidth={130}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Subsolos:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                  {date.units.underground}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.6} minWidth={520}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                  Área total a construída (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                  {date.units.totalToBeBuiltArea}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.6} minWidth={347}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total privativa (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    3.481m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Total de area privativa :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                  {date.units.totalPrivateAreaQuantity}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.6} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Unidades total no empreendimento :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    32
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.6} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Valor médio de venda (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    14.425m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Área total a construir (m²):
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    5.395m²
                  </S.Text>
                </S.ContainerText>
              </Grid>

              <Grid item xs={12} sm={12} md={3.6} minWidth={440}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                  Área total do empreendimento :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    32
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={3.6} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                  Área Total Permutada:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    14.425m²
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={470}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                  Área total privativa líquida de permuta (m²) :
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    5.395m²
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
                    {dayjs(date.deadline.startDate).format('DD/MM/YYYY')}
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={345}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Aprovação do projeto:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.deadline.approvalDeadlineInMonth} meses
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={280}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Execução da obra:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.deadline.constructionDeadlineInMonth} meses
                  </S.Text>
                </S.ContainerText>
              </Grid>
              <Grid item xs={12} sm={12} md={2.9} minWidth={245}>
                <S.ContainerText>
                  <S.Title variant="h6" gutterBottom>
                    Prazo total:
                  </S.Title>
                  <S.Text variant="body2" gutterBottom>
                    {date.deadline.totalDeadlineInMonth} meses
                  </S.Text>
                </S.ContainerText>
              </Grid>
            </Grid>
          </Grid>
        </S.ContainerInfo>
      </S.Section>
      <S.ContainerButtons>
        <Button $isOutline size="80px" onClick={() => handleStep(3)}>
          Voltar
        </Button>
        <Button
          size="100px"
          onClick={() => handleCreateProject(date, navigate, setSnackbar)}
        >
          Finalizar
        </Button>
      </S.ContainerButtons>
    </S.SummaryFormContainer>
  );
};

export { SummaryForm };
