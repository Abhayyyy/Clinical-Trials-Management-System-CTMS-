package com.advarra.ctms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class CtmsApplication {
    public static void main(String[] args) {
        SpringApplication.run(CtmsApplication.class, args);
    }
}

// ===== MODELS =====

package com.advarra.ctms.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "participants")
public class Participant {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    private String phone;
    private Integer age;
    private String gender;
    
    @Column(name = "study_id")
    private String studyId;
    
    private String status; // Screening, Enrolled, Completed, Withdrawn
    
    @Column(name = "enrollment_date")
    private LocalDate enrollmentDate;
    
    @Column(name = "next_visit")
    private LocalDate nextVisit;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at") 
    private LocalDateTime updatedAt;
    
    // Constructors
    public Participant() {}
    
    public Participant(String id, String name, String phone, Integer age, String gender, 
                      String studyId, String status, LocalDate enrollmentDate) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.age = age;
        this.gender = gender;
        this.studyId = studyId;
        this.status = status;
        this.enrollmentDate = enrollmentDate;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getStudyId() { return studyId; }
    public void setStudyId(String studyId) { this.studyId = studyId; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDate getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDate enrollmentDate) { this.enrollmentDate = enrollmentDate; }
    
    public LocalDate getNextVisit() { return nextVisit; }
    public void setNextVisit(LocalDate nextVisit) { this.nextVisit = nextVisit; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

@Entity
@Table(name = "studies")
public class Study {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "principal_investigator")
    private String principalInvestigator;
    
    @Column(name = "target_enrollment")
    private Integer targetEnrollment;
    
    @Column(name = "current_enrollment")
    private Integer currentEnrollment;
    
    private String status; // Recruiting, Active, Completed, Suspended
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "estimated_completion")
    private LocalDate estimatedCompletion;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors, getters, and setters...
    public Study() {}
    
    public Study(String id, String name, String principalInvestigator, 
                Integer targetEnrollment, Integer currentEnrollment, String status,
                LocalDate startDate, LocalDate estimatedCompletion) {
        this.id = id;
        this.name = name;
        this.principalInvestigator = principalInvestigator;
        this.targetEnrollment = targetEnrollment;
        this.currentEnrollment = currentEnrollment;
        this.status = status;
        this.startDate = startDate;
        this.estimatedCompletion = estimatedCompletion;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters (abbreviated for brevity)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPrincipalInvestigator() { return principalInvestigator; }
    public void setPrincipalInvestigator(String principalInvestigator) { this.principalInvestigator = principalInvestigator; }
    public Integer getTargetEnrollment() { return targetEnrollment; }
    public void setTargetEnrollment(Integer targetEnrollment) { this.targetEnrollment = targetEnrollment; }
    public Integer getCurrentEnrollment() { return currentEnrollment; }
    public void setCurrentEnrollment(Integer currentEnrollment) { this.currentEnrollment = currentEnrollment; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEstimatedCompletion() { return estimatedCompletion; }
    public void setEstimatedCompletion(LocalDate estimatedCompletion) { this.estimatedCompletion = estimatedCompletion; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

@Entity
@Table(name = "visits")
public class Visit {
    @Id
    private String id;
    
    @Column(name = "participant_id", nullable = false)
    private String participantId;
    
    @Column(name = "participant_name")
    private String participantName;
    
    @Column(name = "study_id")
    private String studyId;
    
    private String study;
    
    @Column(name = "visit_type")
    private String visitType; // Screening, Baseline, Follow-up, End of Study
    
    @Column(name = "visit_datetime")
    private LocalDateTime visitDateTime;
    
    private String status; // Scheduled, Completed, Cancelled, No-Show
    
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors, getters, and setters...
    public Visit() {}
    
    public Visit(String id, String participantId, String participantName, 
                String studyId, String study, String visitType, 
                LocalDateTime visitDateTime, String status) {
        this.id = id;
        this.participantId = participantId;
        this.participantName = participantName;
        this.studyId = studyId;
        this.study = study;
        this.visitType = visitType;
        this.visitDateTime = visitDateTime;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters (abbreviated)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getParticipantId() { return participantId; }
    public void setParticipantId(String participantId) { this.participantId = participantId; }
    public String getParticipantName() { return participantName; }
    public void setParticipantName(String participantName) { this.participantName = participantName; }
    public String getStudyId() { return studyId; }
    public void setStudyId(String studyId) { this.studyId = studyId; }
    public String getStudy() { return study; }
    public void setStudy(String study) { this.study = study; }
    public String getVisitType() { return visitType; }
    public void setVisitType(String visitType) { this.visitType = visitType; }
    public LocalDateTime getVisitDateTime() { return visitDateTime; }
    public void setVisitDateTime(LocalDateTime visitDateTime) { this.visitDateTime = visitDateTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

// ===== REPOSITORIES =====

package com.advarra.ctms.repository;

import com.advarra.ctms.model.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, String> {
    
    // Find participants by study
    List<Participant> findByStudyId(String studyId);
    
    // Find participants by status
    List<Participant> findByStatus(String status);
    
    // Search participants by name (case insensitive)
    @Query("SELECT p FROM Participant p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Participant> findByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);
    
    // Find participants by study and status
    List<Participant> findByStudyIdAndStatus(String studyId, String status);
    
    // Count participants by status
    Long countByStatus(String status);
    
    // Get enrollment count by month
    @Query(value = "SELECT MONTH(enrollment_date) as month, COUNT(*) as count " +
           "FROM participants WHERE YEAR(enrollment_date) = YEAR(CURDATE()) " +
           "GROUP BY MONTH(enrollment_date) ORDER BY month", nativeQuery = true)
    List<Object[]> getEnrollmentCountByMonth();
}

@Repository
public interface StudyRepository extends JpaRepository<Study, String> {
    
    // Find active studies
    List<Study> findByStatus(String status);
    
    // Find studies by principal investigator
    List<Study> findByPrincipalInvestigator(String principalInvestigator);
    
    // Count active studies
    Long countByStatus(String status);
}

@Repository  
public interface VisitRepository extends JpaRepository<Visit, String> {
    
    // Find visits by participant
    List<Visit> findByParticipantId(String participantId);
    
    // Find visits by status
    List<Visit> findByStatus(String status);
    
    // Find upcoming visits (next 7 days)
    @Query("SELECT v FROM Visit v WHERE v.visitDateTime >= CURRENT_TIMESTAMP " +
           "AND v.visitDateTime <= CURRENT_TIMESTAMP + 7 AND v.status = 'Scheduled'")
    List<Visit> findUpcomingVisits();
    
    // Count visits by status
    Long countByStatus(String status);
}

// ===== SERVICES =====

package com.advarra.ctms.service;

import com.advarra.ctms.model.Participant;
import com.advarra.ctms.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ParticipantService {
    
    @Autowired
    private ParticipantRepository participantRepository;
    
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }
    
    public Page<Participant> getParticipants(Pageable pageable) {
        return participantRepository.findAll(pageable);
    }
    
    public Optional<Participant> getParticipantById(String id) {
        return participantRepository.findById(id);
    }
    
    public Participant saveParticipant(Participant participant) {
        // Generate ID if new participant
        if (participant.getId() == null || participant.getId().isEmpty()) {
            participant.setId(generateParticipantId());
        }
        
        participant.setUpdatedAt(LocalDateTime.now());
        return participantRepository.save(participant);
    }
    
    public void deleteParticipant(String id) {
        participantRepository.deleteById(id);
    }
    
    public Page<Participant> searchParticipants(String searchTerm, Pageable pageable) {
        return participantRepository.findByNameContainingIgnoreCase(searchTerm, pageable);
    }
    
    public List<Participant> getParticipantsByStudy(String studyId) {
        return participantRepository.findByStudyId(studyId);
    }
    
    public List<Participant> getParticipantsByStatus(String status) {
        return participantRepository.findByStatus(status);
    }
    
    private String generateParticipantId() {
        // Simple ID generation - in production, use a more robust approach
        long count = participantRepository.count() + 1;
        return String.format("CT-2024-%03d", count);
    }
}

@Service
public class StudyService {
    
    @Autowired
    private StudyRepository studyRepository;
    
    public List<Study> getAllStudies() {
        return studyRepository.findAll();
    }
    
    public Optional<Study> getStudyById(String id) {
        return studyRepository.findById(id);
    }
    
    public Study saveStudy(Study study) {
        return studyRepository.save(study);
    }
    
    public List<Study> getActiveStudies() {
        return studyRepository.findByStatus("Recruiting");
    }
    
    public void deleteStudy(String id) {
        studyRepository.deleteById(id);
    }
}

@Service
public class VisitService {
    
    @Autowired
    private VisitRepository visitRepository;
    
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }
    
    public Optional<Visit> getVisitById(String id) {
        return visitRepository.findById(id);
    }
    
    public Visit saveVisit(Visit visit) {
        return visitRepository.save(visit);
    }
    
    public List<Visit> getUpcomingVisits() {
        return visitRepository.findUpcomingVisits();
    }
    
    public List<Visit> getVisitsByParticipant(String participantId) {
        return visitRepository.findByParticipantId(participantId);
    }
    
    public void deleteVisit(String id) {
        visitRepository.deleteById(id);
    }
}

// ===== CONTROLLERS =====

package com.advarra.ctms.controller;

import com.advarra.ctms.model.Participant;
import com.advarra.ctms.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "http://localhost:3000") // Allow React dev server
public class ParticipantController {
    
    @Autowired
    private ParticipantService participantService;
    
    @GetMapping
    public ResponseEntity<List<Participant>> getAllParticipants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Participant> participantPage;
        
        if (search != null && !search.isEmpty()) {
            participantPage = participantService.searchParticipants(search, pageable);
        } else {
            participantPage = participantService.getParticipants(pageable);
        }
        
        return ResponseEntity.ok(participantPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Participant> getParticipantById(@PathVariable String id) {
        Optional<Participant> participant = participantService.getParticipantById(id);
        return participant.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Participant> createParticipant(@RequestBody Participant participant) {
        try {
            Participant savedParticipant = participantService.saveParticipant(participant);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedParticipant);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Participant> updateParticipant(
            @PathVariable String id, 
            @RequestBody Participant participant) {
        
        if (!participantService.getParticipantById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        participant.setId(id);
        Participant updatedParticipant = participantService.saveParticipant(participant);
        return ResponseEntity.ok(updatedParticipant);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable String id) {
        if (!participantService.getParticipantById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        participantService.deleteParticipant(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/by-study/{studyId}")
    public ResponseEntity<List<Participant>> getParticipantsByStudy(@PathVariable String studyId) {
        List<Participant> participants = participantService.getParticipantsByStudy(studyId);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<Participant>> getParticipantsByStatus(@PathVariable String status) {
        List<Participant> participants = participantService.getParticipantsByStatus(status);
        return ResponseEntity.ok(participants);
    }
}

@RestController
@RequestMapping("/api/studies")
@CrossOrigin(origins = "http://localhost:3000")
public class StudyController {
    
    @Autowired
    private StudyService studyService;
    
    @GetMapping
    public ResponseEntity<List<Study>> getAllStudies() {
        List<Study> studies = studyService.getAllStudies();
        return ResponseEntity.ok(studies);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Study> getStudyById(@PathVariable String id) {
        Optional<Study> study = studyService.getStudyById(id);
        return study.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Study> createStudy(@RequestBody Study study) {
        Study savedStudy = studyService.saveStudy(study);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudy);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Study> updateStudy(@PathVariable String id, @RequestBody Study study) {
        if (!studyService.getStudyById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        study.setId(id);
        Study updatedStudy = studyService.saveStudy(study);
        return ResponseEntity.ok(updatedStudy);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Study>> getActiveStudies() {
        List<Study> activeStudies = studyService.getActiveStudies();
        return ResponseEntity.ok(activeStudies);
    }
}

@RestController
@RequestMapping("/api/visits")
@CrossOrigin(origins = "http://localhost:3000")
public class VisitController {
    
    @Autowired
    private VisitService visitService;
    
    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisits() {
        List<Visit> visits = visitService.getAllVisits();
        return ResponseEntity.ok(visits);
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<Visit>> getUpcomingVisits() {
        List<Visit> upcomingVisits = visitService.getUpcomingVisits();
        return ResponseEntity.ok(upcomingVisits);
    }
    
    @PostMapping
    public ResponseEntity<Visit> scheduleVisit(@RequestBody Visit visit) {
        Visit scheduledVisit = visitService.saveVisit(visit);
        return ResponseEntity.status(HttpStatus.CREATED).body(scheduledVisit);
    }
    
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Visit> completeVisit(@PathVariable String id) {
        Optional<Visit> visitOpt = visitService.getVisitById(id);
        if (!visitOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Visit visit = visitOpt.get();
        visit.setStatus("Completed");
        Visit updatedVisit = visitService.saveVisit(visit);
        return ResponseEntity.ok(updatedVisit);
    }
}

// Dashboard metrics DTO
class DashboardMetrics {
    private Long totalParticipants;
    private Long activeStudies;
    private Long pendingScreenings;
    private Long monthlyEnrollment;
    
    // Constructors, getters, setters...
    public DashboardMetrics(Long totalParticipants, Long activeStudies, Long pendingScreenings, Long monthlyEnrollment) {
        this.totalParticipants = totalParticipants;
        this.activeStudies = activeStudies;
        this.pendingScreenings = pendingScreenings;
        this.monthlyEnrollment = monthlyEnrollment;
    }
    
    public Long getTotalParticipants() { return totalParticipants; }
    public void setTotalParticipants(Long totalParticipants) { this.totalParticipants = totalParticipants; }
    public Long getActiveStudies() { return activeStudies; }
    public void setActiveStudies(Long activeStudies) { this.activeStudies = activeStudies; }
    public Long getPendingScreenings() { return pendingScreenings; }
    public void setPendingScreenings(Long pendingScreenings) { this.pendingScreenings = pendingScreenings; }
    public Long getMonthlyEnrollment() { return monthlyEnrollment; }
    public void setMonthlyEnrollment(Long monthlyEnrollment) { this.monthlyEnrollment = monthlyEnrollment; }
}

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    @Autowired
    private ParticipantService participantService;
    
    @Autowired
    private StudyService studyService;
    
    @Autowired
    private VisitService visitService;
    
    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetrics> getDashboardMetrics() {
        // In a real application, these would be calculated from the database
        DashboardMetrics metrics = new DashboardMetrics(
            152L, // Total participants - could be participantRepository.count()
            8L,   // Active studies - could be studyRepository.countByStatus("Recruiting")
            23L,  // Pending screenings - could be participantRepository.countByStatus("Screening")
            31L   // Monthly enrollment - custom query
        );
        
        return ResponseEntity.ok(metrics);
    }
}