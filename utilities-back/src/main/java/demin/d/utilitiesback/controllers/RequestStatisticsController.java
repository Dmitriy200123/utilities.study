package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.requestStatistics.RequestStatistics;
import demin.d.utilitiesback.contracts.requestStatistics.UserRequestStatistics;
import demin.d.utilitiesback.services.requestStatistics.RequestStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/request-statistics")
@RequiredArgsConstructor
public class RequestStatisticsController {
    private final RequestStatisticsService requestStatisticsService;

    @GetMapping(value = "/top-requests")
    public List<RequestStatistics> GetTop10Requests() {
        return requestStatisticsService.getTopRequests(10);
    }

    @GetMapping(value = "/top-users")
    public List<UserRequestStatistics> GetTop10Users() {
        return requestStatisticsService.getTopUsers(10);
    }
}
