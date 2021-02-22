import 'reflect-metadata';

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import GetPipedriveWonDealsService from '../GetPipedriveWonDealsService';
import * as utils from '../../utils';

let getPipedriveWonDeals: GetPipedriveWonDealsService;

describe('GetPipedriveWonDeals', () => {
  const PipedriveDealsResponse = {
    data: [{
      id: 1,
      person_id: {
        name: 'John Doe',
        email: {
          value: 'john@doe.com',
        },
        phone: {
          value: '0000-0000',
        },
      },
      won_time: '00-00-00 00:00:00',
      value: 100,
    }],
  };

  const PipedriveProductsResponse = {
    data: [{
      item_price: 100,
      quantity: 1,
      name: 'Test Product',
      product: {
        code: 'TEST',
      },
    }],
  };

  const returnObj = [{
    pedido: {
      numero: 1,
      cliente: {
        nome: 'John Doe',
        email: 'john@doe.com',
        fone: '0000-0000',
      },
      itens: [
        {
          item: {
            descricao: 'Test Product',
            codigo: 'TEST',
            qtde: 1,
            vlr_unit: 100,
          },
        },
      ],
      sum: 100,
    },
  }];

  beforeEach(() => {
    getPipedriveWonDeals = new GetPipedriveWonDealsService();

    jest.spyOn(utils, 'isToday').mockReturnValue(true);

    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet(/.*\/deals$/)
      .reply(200, PipedriveDealsResponse);
    mock
      .onGet(/.*\/products$/)
      .reply(200, PipedriveProductsResponse);
  });

  it('should be able to get a deal from pipedrive', async () => {
    const deal = await getPipedriveWonDeals.execute();
    expect(deal).toMatchObject(returnObj);
  });
});
