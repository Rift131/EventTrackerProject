package com.skilldistillery.hshtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("edEvents/{edEventsId}")
	public EducationEvent findEdEventById(@PathVariable Integer edEventsId) {
		return svc.edEventById(edEventsId);
	}
	
	@GetMapping("edEventsSubject/{subject}")
	public List<EducationEvent> findEdEventsBySubject(@PathVariable String subject) {
		return svc.findBySubject(subject);
	}
	@GetMapping("edEventsLocation/{location}")
	public List<EducationEvent> findEdEventsByLocation(@PathVariable String location) {
		return svc.findByLocation(location);
	}
	
	@PostMapping("newEdEvent")
	public EducationEvent addEdEvent(@RequestBody EducationEvent newEdEvent, HttpServletResponse resp) {
		EducationEvent addEd = null;
		try {
			addEd = svc.addEdEvent(newEdEvent);
			resp.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
		return addEd;
	}
	
	@PutMapping("updateEdEvent/{id}")
	public EducationEvent updateEdEvent(@RequestBody EducationEvent edEvent, @PathVariable int id, HttpServletResponse resp) {
		EducationEvent updated = null;
		
		try {
			updated = svc.updateEdEvent(edEvent, id);
			resp.setStatus(204);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
		System.out.println("Entity value at end of controller: " + updated);
		return updated;
	}
	
	@DeleteMapping("deleteEdEvent/{id}")
	public boolean deleteEdEvent(@PathVariable int id, HttpServletResponse resp) {
		boolean deleted = false; 
		EducationEvent edEventToDelete = svc.edEventById(id);
			if(edEventToDelete != null) {
					svc.deleteEdEvent(id);
					deleted = true;
			} else {
				resp.setStatus(404);
			}
			return deleted;
	}
}
