import 'reflect-metadata';

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import FakeReportsRepository from '../../database/repositories/fakes/FakeReportsRepository';
import PostReportOnDBService from '../PostReportOnDBService';

let fakeReportsRepository: FakeReportsRepository;
let postReportOnDB: PostReportOnDBService;

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

  beforeEach(() => {
    fakeReportsRepository = new FakeReportsRepository();
    postReportOnDB = new PostReportOnDBService(fakeReportsRepository);

    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet(/.*\/deals$/)
      .reply(200, PipedriveDealsResponse);
    mock
      .onGet(/.*\/products$/)
      .reply(200, PipedriveProductsResponse);
  });

  it('should be able to get a report from database', async () => {
    const report = await postReportOnDB.execute();
    expect(report).toHaveProperty('id', 1);
  });
});
