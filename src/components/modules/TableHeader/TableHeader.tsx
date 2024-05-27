import {
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Zoom,
  tooltipClasses
} from '@mui/material';
import { Props } from './@types';
import Theme from '@/styles/Theme';
import { useState, useCallback } from 'react';

const TableHeader = ({ columns }: Props) => {
  const [open, setOpen] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setOpen(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell key={index} align={column.align}>
            <Tooltip
              arrow
              placement="top"
              open={open === index}
              title={column.description}
              TransitionComponent={Zoom}
              slotProps={{
                popper: {
                  sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                      {
                        marginBottom: '10px',
                        backgroundColor: Theme.palette.background.regular,
                        span: {
                          color: Theme.palette.background.regular
                        }
                      }
                  }
                }
              }}
            >
              <p
                style={{
                  maxWidth: 'max-content',
                  cursor: column.description ? 'pointer' : 'context-menu'
                }}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {column.label}
              </p>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export { TableHeader };
