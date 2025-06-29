package com.test.first.repository;

import com.test.first.dto.produitcategoriedto;
import com.test.first.dto.userdto;
import com.test.first.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    userdto findByName(String name);
    boolean existsByName(String name);
    @Modifying
    @Query("delete from User u where u.name = :name")
    void deleteUsersByName( String name);

    void deleteById(long id);

    User findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    boolean checkuser(@Param("email") String email, @Param("password") String password);

    @Query("SELECT count(P) FROM Produit P WHERE P.user.idUse = :idUse")
    int numPro(long idUse);
    @Query("SELECT count(C) FROM Categorie C WHERE C.user.idUse = :idUse")
    int numCat(long idUse);
    @Query("SELECT Count(p),p.categorie.name FROM Produit p WHERE p.user.idUse=:idUse GROUP BY p.categorie.name ")
    List<produitcategoriedto> GroupProduitCat(long idUse);
}