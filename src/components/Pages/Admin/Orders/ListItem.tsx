import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import React, { Fragment, memo, useCallback, useState } from 'react';
import { IOrder } from 'interfaces/models/order';

interface IProps {
  order: IOrder;
}

const ListItem = memo((props: IProps) => {
  const { order } = props;
  const [open, setOpen] = useState(false);

  const handleCollapse = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={handleCollapse}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.quantity}</TableCell>
        <TableCell>{order.value}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' component='div'>
                Descrição:
              </Typography>
              <Typography /* className={classes.folders} */>{order.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
});

export default ListItem;
