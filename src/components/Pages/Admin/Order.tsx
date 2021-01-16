import React, { Fragment, memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import * as yup from 'yup';

import { useFormikObservable } from 'hooks/useFormikObservable';
import { logError } from 'helpers/rxjs-operators/logError';
import orderService from 'services/order';

import TextField from 'components/Shared/Fields/Text';
import Toolbar from 'components/Layout/Toolbar';
import CardLoader from 'components/Shared/CardLoader';
import PaymentIllus from 'assets/illustrations/payment.svg';

const useStyles = makeStyles({
  container: {
    'padding': '4rem 2rem',
    '& img': {
      width: '70%',
      height: 'auto'
    }
  }
});

const validationSchema = yup.object().shape({
  description: yup.string().required(),
  quantity: yup.number().required().integer().positive().min(0),
  value: yup.number().required().positive()
});

const Order = memo((props: {}) => {
  const classes = useStyles(props);

  const formik = useFormikObservable({
    initialValues: { description: '', quantity: 0, value: 0 },
    validationSchema,
    onSubmit(model) {
      const auxModel = {
        ...model,
        quantity: Number(model.quantity)
      };
      return orderService.create(auxModel).pipe(logError(true));
    }
  });

  return (
    <Fragment>
      <Toolbar title='Realize o pedido' />

      <Grid container spacing={3} className={classes.container}>
        <Grid container component='form' onSubmit={formik.handleSubmit} spacing={3}>
          <Grid item xs={12} md={6} component={Card}>
            <CardLoader show={formik.isSubmitting} />
            <Grid container component={CardContent} spacing={3}>
              <Grid
                item
                xs={12}
                component={TextField}
                name='description'
                label='Descrição'
                multiline
                rows={3}
                fullWidth
                formik={formik}
              />
              <Grid
                item
                xs={12}
                component={TextField}
                type='number'
                name='quantity'
                label='Quantidade'
                fullWidth
                formik={formik}
              />
              <Grid
                item
                xs={12}
                component={TextField}
                name='value'
                label='Valor'
                fullWidth
                formik={formik}
                mask='money'
              />
            </Grid>
            <Grid container justify='center'>
              <Button type='submit'>Realizar pedido</Button>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid container item xs={6} component='aside' alignItems='center' justify='center'>
              <img src={PaymentIllus} alt='Ilustração de um homem segurando um cartão de crédito' />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Fragment>
  );
});

export default Order;
