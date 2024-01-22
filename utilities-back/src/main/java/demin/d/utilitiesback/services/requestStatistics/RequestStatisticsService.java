package demin.d.utilitiesback.services.requestStatistics;

import demin.d.utilitiesback.contracts.requestStatistics.RequestStatistics;
import demin.d.utilitiesback.contracts.requestStatistics.UserRequestStatistics;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface RequestStatisticsService {
    List<RequestStatistics> getTopRequests(int count);

    List<UserRequestStatistics> getTopUsers(int count);

    void saveRequestInfo(HttpServletRequest request);
}
