import { Router, Request, Response } from 'express';
import Server from '../class/server';

const router = Router();

router.get('/mensajes', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        mensaje: 'Todo esta bien'
    })
});

router.post('/mensajes', (req: Request, resp: Response) => {
    
    const body = req.body.body;
    const from = req.body.from;

    const payload = {
        from,
        body
    }

    const server = Server.instance;

    server.io.emit('message-new', payload);

    resp.json({
        ok: true,
        body,
        from
    })
});

router.post('/mensajes/:id', (req: Request, resp: Response) => {
    const id = req.params.id;
    const body = req.body.body;
    const from = req.body.from;

    const payload = {
        from,
        body
    }

    const server = Server.instance;

    server.io.in(id). emit('message-private', payload);

    resp.json({
        ok: true,
        body,
        from,
        id 
    }) 
});

export default router;