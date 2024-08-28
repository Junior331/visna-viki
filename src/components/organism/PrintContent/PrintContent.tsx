import { forwardRef, ReactNode, useRef, useImperativeHandle } from 'react';
import { useReactToPrint } from 'react-to-print';
import * as S from './PrintContentStyled';

interface PrintContentProps {
  children: ReactNode;
  documentTitle: string;
}

const PrintContent = forwardRef(({ children, documentTitle }: PrintContentProps, ref) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: documentTitle,
  });

  useImperativeHandle(ref, () => ({
    print: handlePrint,
  }));

  return (
    <S.PrintContentContainer ref={printRef}>
      {children}
    </S.PrintContentContainer>
  );
});

export default PrintContent;
