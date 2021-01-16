import React, { Fragment, memo, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RefreshIcon from 'mdi-react/RefreshIcon';
import Toolbar from 'components/Layout/Toolbar';

import orderService from 'services/order';
import usePaginationObservable from 'hooks/usePagination';
import CardLoader from 'components/Shared/CardLoader';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import TableCellSortable from 'components/Shared/Pagination/TableCellSortable';
import TablePagination from 'components/Shared/Pagination/TablePagination';
import TableWrapper from 'components/Shared/TableWrapper';
import SearchField from 'components/Shared/Pagination/SearchField';
import ListItem from './ListItem';
const UserListPage = memo(() => {
  const [params, mergeParams, loading, data, error, , refresh] = usePaginationObservable(
    params => orderService.list(params),
    { orderBy: 'description', orderDirection: 'asc' },
    []
  );

  const handleRefresh = useCallback(() => refresh(), [refresh]);

  const { total, results } = data || ({ total: 0, results: [] } as typeof data);

  return (
    <Fragment>
      <Toolbar title='Pedidos' />

      <Card>
        <CardLoader show={loading} />

        <CardContent>
          <Grid container justify='space-between' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <SearchField paginationParams={params} onChange={mergeParams} />
            </Grid>
          </Grid>
        </CardContent>

        <TableWrapper minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCellSortable paginationParams={params} disabled={loading} onChange={mergeParams} column='id'>
                  Identificador:
                </TableCellSortable>
                <TableCellSortable
                  paginationParams={params}
                  disabled={loading}
                  onChange={mergeParams}
                  column='quantity'
                >
                  Quantidade
                </TableCellSortable>
                <TableCellSortable paginationParams={params} disabled={loading} onChange={mergeParams} column='value'>
                  Valor
                </TableCellSortable>
                <TableCellActions>
                  <IconButton disabled={loading} onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </TableCellActions>
              </TableRow>
            </TableHead>
            <TableBody>
              <EmptyAndErrorMessages
                colSpan={3}
                error={error}
                loading={loading}
                hasData={results.length > 0}
                onTryAgain={refresh}
              />
              {results.map(order => (
                <ListItem key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <TablePagination total={total} disabled={loading} paginationParams={params} onChange={mergeParams} />
      </Card>
    </Fragment>
  );
});

export default UserListPage;
