package com.example.WatchShop.controller.image;

import com.example.WatchShop.util.ImageFile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/image")
@Slf4j
public class ImageController {

    @GetMapping("/{imageName}")
    public ResponseEntity<?> getImage(@PathVariable("imageName") String imageName) {
        if (imageName == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }

        Path fileName = Paths.get(ImageFile.PATH_IMAGE, imageName);
        try {
            byte[] buffer = Files.readAllBytes(fileName);
            ByteArrayResource bytes = new ByteArrayResource(buffer);
            MediaType mediaType = getMediaType(imageName);
            return ResponseEntity
                    .ok()
                    .contentLength(buffer.length)
                    .contentType(mediaType)
                    .body(bytes);
        } catch (IOException e) {
            if ("undefined".equals(imageName)) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .build();
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .build();
        }
    }

    private MediaType getMediaType(String imageName) {
        if (imageName == null) return MediaType.IMAGE_PNG;
        String lower = imageName.toLowerCase();
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return MediaType.IMAGE_JPEG;
        if (lower.endsWith(".png")) return MediaType.IMAGE_PNG;
        if (lower.endsWith(".gif")) return MediaType.IMAGE_GIF;
        if (lower.endsWith(".webp")) return MediaType.parseMediaType("image/webp");
        if (lower.endsWith(".avif")) return MediaType.parseMediaType("image/avif");
        return MediaType.IMAGE_PNG;
    }
}
