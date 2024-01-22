package demin.d.utilitiesback.repositories.requestStatistics.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "requests")
public class RequestInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String requestType;

    private String UserName;
}
