package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.RequestStatistics;
import demin.d.utilitiesback.repositories.statistics.RequestStatisticsRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/request-statistics")
public class RequestStatisticsController {
    private final RequestStatisticsRepository requestStatisticsRepository;

    public RequestStatisticsController(RequestStatisticsRepository requestStatisticsRepository) {
        this.requestStatisticsRepository = requestStatisticsRepository;
    }

    @GetMapping(value = "/top-requests")
    public List<RequestStatistics> GetTop10Requests() {
        return requestStatisticsRepository
                .getRequestStatistics()
                .stream()
                .map(e -> {
                    var info = new RequestStatistics();
                    info.setRequestType(e.getRequestType());
                    info.setCount(e.getCount());
                    return info;
                })
                .toList();
    }
}
