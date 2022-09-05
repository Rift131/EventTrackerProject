package com.skilldistillery.hshtracker.services;

import java.util.List;

import com.skilldistillery.hshtracker.entities.EducationEvent;

public interface EducationEventService {
// GET HTTP VERBS
List<EducationEvent> index(); // FREE- not found in the Repository
EducationEvent edEventById(int edId);
List<EducationEvent> findBySubject(String subject);
List<EducationEvent> findByLocation(String location);
List<EducationEvent> findByStudent(String student);
// POST HTTP VERBS
EducationEvent addEdEvent(EducationEvent edEvent);

// PUT HTTP VERBS
EducationEvent updateEdEvent(EducationEvent edEvent, int edId);

// DELETE HTTP VERBS
Boolean deleteEdEvent(int id);
}
