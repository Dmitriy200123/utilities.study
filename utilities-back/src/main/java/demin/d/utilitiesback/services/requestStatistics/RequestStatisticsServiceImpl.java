package demin.d.utilitiesback.services.requestStatistics;

import demin.d.utilitiesback.contracts.requestStatistics.RequestStatistics;
import demin.d.utilitiesback.contracts.requestStatistics.UserRequestStatistics;
import demin.d.utilitiesback.repositories.requestStatistics.RequestStatisticsRepository;
import demin.d.utilitiesback.repositories.requestStatistics.entities.RequestInfo;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RequestStatisticsServiceImpl implements RequestStatisticsService {
    private final RequestStatisticsRepository requestStatisticsRepository;

    @Override
    public List<RequestStatistics> getTopRequests(int count) {
        return requestStatisticsRepository
                .getRequestStatistics(count)
                .stream()
                .map(e -> {
                    var info = new RequestStatistics();
                    info.setRequestType(e.getRequestType());
                    info.setCount(e.getCount());
                    return info;
                })
                .toList();
    }

    @Override
    public List<UserRequestStatistics> getTopUsers(int count) {
        return requestStatisticsRepository
                .getUserRequestStatistics(count)
                .stream()
                .map(e -> {
                    var info = new UserRequestStatistics();
                    info.setUserName(e.getUserName());
                    info.setCount(e.getCount());
                    return info;
                })
                .toList();
    }

    @Override
    public void saveRequestInfo(HttpServletRequest request) {
        if (request == null)
            return;

        var requestLog = new RequestInfo();
        requestLog.setRequestType(request.getRequestURI());
        requestLog.setUserName(request.getUserPrincipal().getName());
        requestStatisticsRepository.save(requestLog);
    }
}
