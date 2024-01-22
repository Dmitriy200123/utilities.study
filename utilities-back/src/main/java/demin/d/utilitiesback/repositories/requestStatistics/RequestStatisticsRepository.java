package demin.d.utilitiesback.repositories.requestStatistics;

import demin.d.utilitiesback.repositories.requestStatistics.entities.RequestInfo;
import demin.d.utilitiesback.repositories.requestStatistics.entities.RequestStatistics;
import demin.d.utilitiesback.repositories.requestStatistics.entities.UserRequestStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RequestStatisticsRepository extends JpaRepository<RequestInfo, UUID> {
    @Query("select new demin.d.utilitiesback.repositories.requestStatistics.entities.RequestStatistics(info.requestType, count(*)) from RequestInfo info group by info.requestType order by count(*) desc limit ?1")
    List<RequestStatistics> getRequestStatistics(@Param("requestCount") int requestCount);

    @Query("select new demin.d.utilitiesback.repositories.requestStatistics.entities.UserRequestStatistics(info.UserName, count(*)) from RequestInfo info group by info.UserName order by count(*) desc limit ?1")
    List<UserRequestStatistics> getUserRequestStatistics(@Param("userCount") int userCount);
}
