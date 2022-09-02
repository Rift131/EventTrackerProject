package com.skilldistillery.hshtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.hshtracker.entities.EducationEvent;
import com.skilldistillery.hshtracker.services.EducationEventService;

@RestController
@RequestMapping("api")
public class EducationEventController {
	
	@Autowired
	private EducationEventService svc;
	
	@GetMapping("edEvents")
	public List<EducationEvent> index() {
		return svc.index();
	}

}
