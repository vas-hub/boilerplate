import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [ConfigModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/eligibility (SUCCESS)', async () => {
    const res = await request(app.getHttpServer())
      .post('/eligibility')
      .send({
        naturalPerson: true,
        fiscalResidenceInItaly: true,
        alreadyHasAPir: false,
      })
    
    expect(res.status).toBe(201);
    expect(res.text).toMatch(/\/simulations\/.*/gi);
  });

  it('/eligibility (FAIL)', async () => {
    const res = await request(app.getHttpServer())
      .post('/eligibility')
      .send({
        naturalPerson: true,
        fiscalResidenceInItaly: true,
        alreadyHasAPir: true,
      })

    expect(res.status).toBe(201);
    expect(res.text).toMatch(/\/feedbacks\/red/gi);
  });

  it('/pir-compliance (SUCCESS)', async () => {
    const partecipazioniParams = [
      {
        name: 'emittente',
        value: 'società'
      },
      {
        name: 'tipologia-emittente',
        value: 'srl'
      },
      {
        name: 'mercato',
        value: 'aim'
      },
      {
        name: 'residenza',
        value: 'italia'
      },
      {
        name: 'sede-in-italia',
        value: true
      }
    ];

    const input = {
      assetDescriptions: [
        {
          category: 'partecipazioni',
          name: 'tit-1',
          amount: 50000,
          params: [
            ...partecipazioniParams,
            {
              name: 'nome-emittente',
              value: 'srl pippo'
            }
          ]
        },
        {
          category: 'partecipazioni',
          name: 'tit-2',
          amount: 50000,
          params: [
            ...partecipazioniParams,
            {
              name: 'nome-emittente',
              value: 'srl Pluto'
            }
          ]
        },
        {
          category: 'partecipazioni',
          name: 'tit-3',
          amount: 50000,
          params: [
            ...partecipazioniParams,
            {
              name: 'nome-emittente',
              value: 'srl Paperino'
            }
          ]
        },
        {
          category: 'partecipazioni',
          name: 'tit-4',
          amount: 50000,
          params: [
            ...partecipazioniParams,
            {
              name: 'nome-emittente',
              value: 'srl Topolino'
            }
          ]
        },
        {
          category: 'partecipazioni',
          name: 'tit-5',
          amount: 50000,
          params: [
            ...partecipazioniParams,
            {
              name: 'nome-emittente',
              value: 'srl Paperone'
            }
          ]
        },
      ]
    };
    const res = await request(app.getHttpServer())
      .post('/pir-compliance')
      .send(input)

    expect(res.status).toBe(201);
    expect(res.text).toMatch(/\/feedbacks\/green\?count.*/gi);
  });

  it('/pir-compliance (FAIL)', async () => {
    const res = await request(app.getHttpServer())
      .post('/pir-compliance')
      .send({ assetDescriptions: [] })

    expect(res.status).toBe(201);
    expect(res.text).toMatch(/\/feedbacks\/orange/gi);
  });

  

});
