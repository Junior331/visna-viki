import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Props } from './@types';
import * as S from './AccordionStyled';

const Accordion = ({ title, isOpen, handleClick, children }: Props) => {
  return (
    <S.Container>
      <MuiAccordion expanded={isOpen}>
        <AccordionSummary
          onClick={handleClick}
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MuiAccordion>
    </S.Container>
  );
};

export { Accordion };
