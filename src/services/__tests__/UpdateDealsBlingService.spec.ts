import 'reflect-metadata';

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import UpdateDealsBlingService from '../UpdateDealsBlingService';
import * as utils from '../../utils';

let updateDealsBling: UpdateDealsBlingService;

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

  const BlingGetEmptyResponse = {
    erros: [
      {
        erro: {
          cod: 14,
          msg: 'A informacao desejada nao foi encontrada',
        },
      },
    ],
  };

  const BlingGetFullResponse = {
    retorno: {
      pedidos: [
        {
          pedido: {
            numero: '1',
          },
        },
      ],
    },
  };

  const BlingPostSuccessResponse = {
    pedidos: [
      {
        pedido: {
          numero: '1',
        },
      },
    ],
  };

  beforeEach(() => {
    updateDealsBling = new UpdateDealsBlingService();

    jest.spyOn(utils, 'isToday').mockReturnValue(true);

    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet(/.*\/deals$/)
      .reply(200, PipedriveDealsResponse);
    mock
      .onGet(/.*\/products$/)
      .reply(200, PipedriveProductsResponse);
    mock
      .onGet(/.*json.*/)
      .reply(200, BlingGetEmptyResponse);
    mock
      .onPost(/.*json.*/)
      .reply(200, BlingPostSuccessResponse);
  });

  it('should be able to update a deal on bling with pipedrive data', async () => {
    const deal = await updateDealsBling.execute();
    expect(deal).toMatchObject([BlingPostSuccessResponse]);
  });

  it('should not be able to update a deal on bling if it is already there', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet(/.*\/deals$/)
      .reply(200, PipedriveDealsResponse);
    mock
      .onGet(/.*\/products$/)
      .reply(200, PipedriveProductsResponse);
    mock
      .onGet(/.*pedido.*/)
      .reply(200, BlingGetFullResponse);
    const deal = await updateDealsBling.execute();
    expect(deal).toMatchObject({ message: 'Nothing to be updated' });
  });
});
