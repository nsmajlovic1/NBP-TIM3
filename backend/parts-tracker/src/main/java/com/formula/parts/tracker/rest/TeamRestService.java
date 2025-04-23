package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.team.TeamService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.team.TeamRequest;
import com.formula.parts.tracker.shared.dto.team.TeamResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.success.ApiSuccessResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Team API")
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamRestService {
    private final TeamService teamService;

    @PostMapping("create")
    public ResponseEntity<TeamResponse> createTeam(
            @Valid @RequestBody final TeamRequest request) throws ApiException {
        return ResponseEntity.ok(teamService.create(request));
    }

    @GetMapping("all")
    public ResponseEntity<Page<TeamResponse>> getAllTeams(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", defaultValue = "1") Long page,
            @RequestParam(value = "size", defaultValue = "10") Long size){
        return ResponseEntity.ok(teamService.getAllTeams(search, page, size));
    }

    /*@DeleteMapping("{team_id}/remove/{user_id}")
    public ResponseEntity<ApiSuccessResponse> removeTeamMember(@PathVariable long id) throws ApiException {
        teamService.removeTeamMember(team_id,user_id);
        ApiSuccessResponse successResponse = new ApiSuccessResponse(HttpStatus.OK, "Company with ID " + id + " has been successfully deleted.");
        return ResponseEntity.ok(successResponse);
    }*/
}
