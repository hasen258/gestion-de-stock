package com.test.first.repository;

import com.test.first.dto.categoriedto;
import com.test.first.entity.Categorie;
import com.test.first.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    void deleteById(Long idCat);
    @Query("SELECT count(c) from Categorie c WHERE c.user.idUse = :idUse and c.name=:name")
    int existsByName(String name,Long idUse);
    boolean existsById(Long id);
    
    @Query("SELECT c FROM Categorie c WHERE c.user.idUse = :idUse")
    Categorie[] findCategorieByIdUse(@Param("idUse") Long idUse);
}
