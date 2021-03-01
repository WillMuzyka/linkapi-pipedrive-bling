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

  const PipedriveUpdatedDealsResponse = {
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
      value: 0,
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

  const PipedriveUpdatedProductsResponse = {
    data: [{
      item_price: 100,
      quantity: 0,
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
      .onGet(/.*deals.*/)
      .reply(200, PipedriveDealsResponse);
    mock
      .onGet(/.*products.*/)
      .reply(200, PipedriveProductsResponse);
  });

  it('should be able to post a report on the database', async () => {
    const report = await postReportOnDB.execute();
    expect(report).toHaveProperty('id', 1);
  });

  it('should be able to update a report from database', async () => {
    const report = await postReportOnDB.execute();
    expect(report).toHaveProperty('id', 1);

    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet(/.*deals$/)
      .reply(200, PipedriveUpdatedDealsResponse);
    mock
      .onGet(/.*products$/)
      .reply(200, PipedriveUpdatedProductsResponse);

    const updatedReport = await postReportOnDB.execute();
    expect(updatedReport).toHaveProperty('sum', 0);
  });
});
