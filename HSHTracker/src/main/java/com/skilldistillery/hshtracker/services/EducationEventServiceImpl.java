package com.skilldistillery.hshtracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.hshtracker.entities.EducationEvent;
import com.skilldistillery.hshtracker.repositories.EducationEventRepository;

@Service 
public class EducationEventServiceImpl implements EducationEventService{
	@Autowired
	private EducationEventRepository repo;
	@Override
	public List<EducationEvent> index() {
		return repo.findAll();
	}

}
