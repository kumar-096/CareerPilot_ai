from abc import ABC, abstractmethod
from typing import List, Any, Optional

class ReadinessRepository(ABC):
    @abstractmethod
    def load(self, user_id: Optional[str] = None) -> Any: pass
    @abstractmethod
    def save(self, snapshot: Any, user_id: Optional[str] = None) -> None: pass

def get_readiness_repo() -> ReadinessRepository: raise NotImplementedError

class TrustRepository(ABC):
    @abstractmethod
    def load(self, user_id: Optional[str] = None) -> Any: pass
    @abstractmethod
    def save(self, snapshot: Any, user_id: Optional[str] = None) -> None: pass

def get_trust_repo() -> TrustRepository: raise NotImplementedError

class InterviewRepository(ABC):
    @abstractmethod
    def load_all(self, user_id: Optional[str] = None) -> List[Any]: pass
    @abstractmethod
    def save(self, session: Any, user_id: Optional[str] = None) -> None: pass

def get_interview_repo() -> InterviewRepository: raise NotImplementedError

class ProgressRepository(ABC):
    @abstractmethod
    def load(self, user_id: Optional[str] = None) -> Any: pass
    @abstractmethod
    def save(self, snapshot: Any, user_id: Optional[str] = None) -> None: pass

def get_progress_repo() -> ProgressRepository: raise NotImplementedError

class RoadmapRepository(ABC):
    @abstractmethod
    def load(self, user_id: Optional[str] = None) -> Any: pass
    @abstractmethod
    def save(self, snapshot: Any, user_id: Optional[str] = None) -> None: pass
    @abstractmethod
    def handle_sprint_start(self, sprint_name: str, user_id: Optional[str] = None) -> Any: pass
    @abstractmethod
    def handle_sprint_close(self, sprint_name: str, user_id: Optional[str] = None) -> Any: pass
    @abstractmethod
    def handle_task_complete(self, task_id: str, sprint_name: str, user_id: Optional[str] = None) -> Any: pass

def get_roadmap_repo() -> RoadmapRepository: raise NotImplementedError

class ActivityEventRepository(ABC):
    @abstractmethod
    def load_all(self, user_id: Optional[str] = None) -> List[Any]: pass
    @abstractmethod
    def append(self, event: Any, user_id: Optional[str] = None) -> None: pass

def get_activity_repo() -> ActivityEventRepository: raise NotImplementedError

class DashboardProjectionRepository(ABC):
    @abstractmethod
    def load(self, user_id: Optional[str] = None) -> Any: pass

def get_dashboard_repo() -> DashboardProjectionRepository: raise NotImplementedError
