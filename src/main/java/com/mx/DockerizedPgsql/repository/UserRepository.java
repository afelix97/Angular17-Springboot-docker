package com.mx.DockerizedPgsql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mx.DockerizedPgsql.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

}
