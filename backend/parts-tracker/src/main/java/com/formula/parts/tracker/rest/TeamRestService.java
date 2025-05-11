package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.team.TeamService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.dto.team.TeamMemberResponse;
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

import java.util.List;

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

    @GetMapping("{id}")
    public ResponseEntity<TeamResponse> getTeam(@PathVariable long id) throws ApiException {
        return ResponseEntity.ok(teamService.getTeam(id));
    }

    @PostMapping("{team_id}/assign/{user_id}")
    public ResponseEntity<ApiSuccessResponse> assignMemberToTeam(
            @PathVariable("team_id") long teamId,
            @PathVariable("user_id") long userId) throws ApiException {

        teamService.assignMember(teamId, userId);
        ApiSuccessResponse successResponse = new ApiSuccessResponse(HttpStatus.OK,
                "User assigned to team successfully.");
        return ResponseEntity.ok(successResponse);
    }

    @DeleteMapping("{team_id}/remove/{user_id}")
    public ResponseEntity<ApiSuccessResponse> removeTeamMember(
            @PathVariable("team_id") long teamId,
            @PathVariable("user_id") long userId) throws ApiException {

        teamService.removeTeamMember(teamId, userId);
        ApiSuccessResponse successResponse = new ApiSuccessResponse(HttpStatus.OK,
                "User removed from team successfully.");
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("/logistics/available")
    public ResponseEntity<List<TeamMemberResponse>> getAvailableLogisticUsers() {
        return ResponseEntity.ok(teamService.getAvailableLogisticUsers());
    }

    @GetMapping("/mechanics/available")
    public ResponseEntity<List<TeamMemberResponse>> getAvailableMechanicUsers() {
        return ResponseEntity.ok(teamService.getAvailableMechanicUsers());
    }
}
