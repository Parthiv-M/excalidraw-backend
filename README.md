# Excalidraw-saver API

This repository contains the API routes for the [excalidraw-saver](https://github.com/Parthiv-M/excalidraw-saver) application.

## API endpoints

- `/api/upload` - A `POST` route that uploads files to the server's `/uploads` directory. The route accepts `multipart/formdata` content and utilises [formidable](npmjs.com/package/formidable) to parse the form's contents. The files are saved according to the URL generated for each specific file, which eventually become the file names.
- `/api/getFiles` - A `GET` route that fetches all the file names that are present in the `/uploads` directory
- `/api/download` - A `GET` route that takes a `query` parameter of the form `?fileName=`, where the file name is passed from the client application

