package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.Brands;
import com.example.WatchShop.model.Images;
import com.example.WatchShop.model.Products;
import com.example.WatchShop.model.dto.req.ProductReqDTO;
import com.example.WatchShop.model.dto.res.ProductDetailResDTO;
import com.example.WatchShop.model.dto.res.ProductResDTO;
import com.example.WatchShop.repository.BrandRepository;
import com.example.WatchShop.repository.ImageRepository;
import com.example.WatchShop.repository.ProductRepository;
import com.example.WatchShop.service.i_service.ProductService;
import com.example.WatchShop.service.i_service.RatingService;
import com.example.WatchShop.util.ImageFile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Date;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final BrandRepository brandRepository;
    private final RatingService ratingService;

    @Override
    public ProductDetailResDTO getProductById(Long id) {
        Optional<Products> products = productRepository.findById(id);
        ProductDetailResDTO productDetailResDTO = new ProductDetailResDTO(products.get());
        List<Products> getSameBrandProducts = productRepository.findAllByBrandsId(productDetailResDTO.getBrandID());

        List<ProductResDTO> getSameBrandProductsRes = getSameBrandProducts
                .stream()
                .map(ProductResDTO::new)
                .toList();

        getSameBrandProductsRes.forEach(p -> p.setStar(ratingService.getStarOfProduct(p.getId())));
        productDetailResDTO.setSameBrandProducts(getSameBrandProductsRes);
        return productDetailResDTO;
    }

    @Override
    public int save(ProductReqDTO products) {
        Brands brands = brandRepository
                .findById(products.getIdBrand())
                .orElse(null);

        if (brands == null) {
            return 1;
        }

        Calendar calendar = Calendar.getInstance();
        Date currentDate = new Date(calendar.getTime().getTime());

        if (products.getId() == null) {
            //addProduct
            return addProducts(products, currentDate, brands);
        } else {
            //update
            return updateProduct(products, brands, currentDate);
        }
    }

    private int addProducts(ProductReqDTO products, Date currentDate, Brands brands) {
        int count = productRepository.countByName(products.getName());

        // đã tồn tại sản phẩm
        if (count > 0) {
            return 2;
        }

        try {
            String fileName = ImageFile.saveImageFile(products.getImages());
            if (fileName.isEmpty()) {
                return 1;
            }

            Products newProduct = new Products();
            newProduct.setName(products.getName());
            newProduct.setPrice(products.getPrice());
            newProduct.setDescription(products.getDescription());
            newProduct.setDiscount(products.getDiscount());
            newProduct.setQuantity(products.getQuantity());
            newProduct.setSoldQuantity(products.getSoldQuantity());
            newProduct.setModel(products.getModel());
            newProduct.setColor(products.getColor());
            newProduct.setOrigin(products.getOrigin());
            newProduct.setWarrantyPeriod(products.getWarrantyPeriod());
            newProduct.setScreenSize(products.getScreenSize());
            newProduct.setFaceMaterial(products.getFaceMaterial());
            newProduct.setFaceSize(products.getFaceSize());
            newProduct.setFrameMaterial(products.getFrameMaterial());
            newProduct.setWireMaterial(products.getWireMaterial());
            newProduct.setProductWeight(products.getProductWeight());
            newProduct.setCreateDate(currentDate);
            newProduct.setUpdateDate(currentDate);
            newProduct.setBrands(brands);

            Images image = new Images();
            image.setCreateDate(currentDate);
            image.setUpdateDate(currentDate);
            image.setSource(fileName);
            image.setProducts(newProduct);
            newProduct.setImages(Collections.singletonList(image));
            productRepository.save(newProduct);
            return 0;
        } catch (IOException e) {
                log.error("save file error", e);
            return 2;
        }
    }

    private int updateProduct(ProductReqDTO products, Brands brands, Date currentDate) {
        Optional<Products> optionalProducts = productRepository.findById(products.getId());
        if (optionalProducts.isEmpty()) {
            return 1;
        }

        Products oldProduct = optionalProducts.get();
        if (!Objects.equals(oldProduct.getBrands().getId(), products.getIdBrand())) {
            oldProduct.setBrands(brands);
        }

        if (products.getImages() != null) {
            String fileName = null;
            try {
                fileName = ImageFile.saveImageFile(products.getImages());
            } catch (IOException e) {
                log.error("save file error", e);
                return 1;
            }
            boolean hasRemoved = ImageFile.deleteImageFile(
                    oldProduct
                            .getImages()
                            .stream()
                            .findFirst()
                            .get()
                            .getSource()
            );

            if (fileName.isEmpty() && hasRemoved) {
                return 1;
            }

            Images images = imageRepository.findBySource(
                    oldProduct
                            .getImages()
                            .stream()
                            .findFirst()
                            .get()
                            .getSource()
            );
            images.setSource(fileName);
            images.setUpdateDate(currentDate);
            oldProduct.setImages(Collections.singletonList(images));
        }

        oldProduct.setName(products.getName());
        oldProduct.setPrice(products.getPrice());
        oldProduct.setDescription(products.getDescription());
        oldProduct.setDiscount(products.getDiscount());
        oldProduct.setQuantity(products.getQuantity());
        oldProduct.setSoldQuantity(products.getSoldQuantity());
        oldProduct.setModel(products.getModel());
        oldProduct.setColor(products.getColor());
        oldProduct.setOrigin(products.getOrigin());
        oldProduct.setWarrantyPeriod(products.getWarrantyPeriod());
        oldProduct.setScreenSize(products.getScreenSize());
        oldProduct.setFaceMaterial(products.getFaceMaterial());
        oldProduct.setFaceSize(products.getFaceSize());
        oldProduct.setFrameMaterial(products.getFrameMaterial());
        oldProduct.setWireMaterial(products.getWireMaterial());
        oldProduct.setProductWeight(products.getProductWeight());
        oldProduct.setUpdateDate(currentDate);
        oldProduct.setBrands(brands);
        productRepository.save(oldProduct);
        return 0;
    }

    @Override
    public Products save(Products products) {
        return productRepository.save(products);
    }

    @Override
    public boolean removeProduct(Long id) {
        Optional<Products> optionalProducts = productRepository.findById(id);
        if (optionalProducts.isEmpty()) {
            return false;
        }
        Products products = optionalProducts.get();

        try {
            productRepository.deleteById(products.getId());
            ImageFile.deleteImageFile(
                    products
                            .getImages()
                            .stream()
                            .findFirst()
                            .get()
                            .getSource()
            );
        } catch (Exception e) {
            log.error("handel file error", e);
            return false;
        }

        return true;
    }

    @Override
    public List<ProductDetailResDTO> getAllProduct(Long brandID) {
        List<Products> products = productRepository.findAll();
        if (brandID != null) {
            products = products
                    .stream()
                    .filter(x -> x.getBrands().getId().equals(brandID))
                    .toList();
        }

        if (products.isEmpty()) {
            return new ArrayList<>();
        }

        List<ProductDetailResDTO> productDetailResDTOS = products
                .stream()
                .sorted(Comparator.comparing(Products::getDiscount).reversed())
                .map(ProductDetailResDTO::new)
                .toList();

        productDetailResDTOS.forEach(p -> p.setStar(ratingService.getStarOfProduct(p.getId())));

        return productDetailResDTOS;
    }

    @Override
    public List<ProductDetailResDTO> getTop5Product() {
        List<Products> products = productRepository
                .findAll()
                .stream()
                .filter(x -> x.getSoldQuantity() != null)
                .sorted(Comparator.comparing(Products::getSoldQuantity, Comparator.reverseOrder()))
                .limit(5)
                .toList();

        if (products.isEmpty()) {
            return new ArrayList<>();
        }

        List<ProductDetailResDTO> productDetailResDTOS = products
                .stream()
                .map(ProductDetailResDTO::new)
                .toList();

        productDetailResDTOS.forEach(p -> p.setStar(ratingService.getStarOfProduct(p.getId())));
        return productDetailResDTOS;
    }
}
