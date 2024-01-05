package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.repositories.statistics.RequestStatisticsRepository;
import demin.d.utilitiesback.repositories.statistics.entities.RequestStatistics;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/request-statistics")
public class RequestStatisticsController {
    private RequestStatisticsRepository requestStatisticsRepository;

    @GetMapping(value = "/top-requests")
    public List<RequestStatistics> GetTop10Requests() {
        return requestStatisticsRepository.getRequestStatistics();
    }
}
