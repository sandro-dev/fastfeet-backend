import File from '../models/File';

class FileController {
  async store(request, response) {
    try {
      const { originalname: name } = request.file;
      const path = request.file.filename || request.file.uri;

      const file = await File.create({
        name,
        path,
      });

      return response.status(201).json(file);
    } catch (error) {
      return response.status(400).json({ error: 'Erro interno' });
    }
  }
}

export default new FileController();
