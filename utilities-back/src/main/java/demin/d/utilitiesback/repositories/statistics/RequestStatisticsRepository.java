package demin.d.utilitiesback.repositories.statistics;

import demin.d.utilitiesback.repositories.statistics.entities.RequestInfo;
import demin.d.utilitiesback.repositories.statistics.entities.RequestStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RequestStatisticsRepository extends JpaRepository<RequestInfo, UUID> {
    @Query("select new demin.d.utilitiesback.repositories.statistics.entities.RequestStatistics(info.requestType, count(*)) from RequestInfo info group by info.requestType, count(*) order by count(*) desc limit 10")
    List<RequestStatistics> getRequestStatistics();
}
