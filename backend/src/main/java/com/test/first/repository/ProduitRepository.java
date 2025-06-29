package com.test.first.repository;

import com.test.first.dto.produitcategoriedto;
import com.test.first.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;




import com.test.first.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    Produit findByName(String name);
    Produit findByIdPro(long id);
    boolean existsByName(String name);
    void deleteById(long id);

    @Query("SELECT p FROM Produit p,Categorie c WHERE p.categorie.idCat = c.idCat AND c.name LIKE %:name% AND c.user.idUse= :idUse")
    Produit[] findByUsercategorie(long idUse,@Param("name") String name);
    @Query("DELETE FROM Produit p WHERE p.categorie.idCat = 34 ")
    void deleteBycategorie();
    @Query("SELECT p FROM Produit p  WHERE p.name LIKE %:name% AND p.user.idUse = :idUse")
    Produit[] findByUserproduit(long idUse,@Param("name") String name);
    @Query("SELECT p FROM Produit p,User u WHERE p.user.idUse = u.idUse AND u.name = :name")
    Produit findByUserName(@Param("name") String name,long idUse);

    List<Produit> findByUser(User user);



}

