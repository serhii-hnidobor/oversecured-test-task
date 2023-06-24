import { NextFunction, Request, Response, Router } from 'express';
import { responseMiddleware, validateSchema } from '@middlewares';
import { VisitorsRepository } from '@repositories';
import {
  CreateVisitorRequestSchema,
  GetAllVisitorResponseDto,
  GetVisitorResponseDto,
  UpdateVisitorRequestSchema,
} from '@config';

const router = Router();

router.get(
  '/',
  function (req, res, next) {
    VisitorsRepository.getAll<GetAllVisitorResponseDto>()
      .then((result) => (res.locals.data = result))
      .catch((error) => (res.locals.error = error))
      .finally(() => next());
  },
  responseMiddleware,
);

router.get(
  '/:id',
  function (req, res, next) {
    const id = req.params.id;

    VisitorsRepository.getById<GetVisitorResponseDto>(id)
      .then((result) => (res.locals.data = result))
      .catch((error) => (res.locals.error = error))
      .finally(() => next());
  },
  responseMiddleware,
);

router.post(
  '/',
  validateSchema(CreateVisitorRequestSchema),
  function (req: Request, res: Response, next: NextFunction) {
    VisitorsRepository.create(req.body)
      .then((result) => (res.locals.data = result))
      .catch((error) => (res.locals.error = error))
      .finally(() => next());
  },
  responseMiddleware,
);

router.put(
  '/:id',
  validateSchema(UpdateVisitorRequestSchema),
  function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    VisitorsRepository.update(req.body, id)
      .then((result) => (res.locals.data = result))
      .catch((error) => (res.locals.error = error))
      .finally(() => next());
  },
  responseMiddleware,
);

router.delete(
  '/:id',
  function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    VisitorsRepository.delete(id)
      .then((result) => (res.locals.data = result))
      .catch((error) => (res.locals.error = error))
      .finally(() => next());
  },
  responseMiddleware,
);

export default router;
