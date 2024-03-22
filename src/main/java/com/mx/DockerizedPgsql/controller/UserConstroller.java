package com.mx.DockerizedPgsql.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.DockerizedPgsql.model.User;
import com.mx.DockerizedPgsql.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserConstroller {

	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public List<User> getAllUsers() {
		return userRepository.findAll();

	}

	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id) {
		return userRepository.findById(id).get();
	}

	@PostMapping
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteUserById(@PathVariable Long id) {
		userRepository.deleteById(id);

		return !userRepository.existsById(id) ? ResponseEntity.ok(true) : ResponseEntity.ok(false);
	}

}
