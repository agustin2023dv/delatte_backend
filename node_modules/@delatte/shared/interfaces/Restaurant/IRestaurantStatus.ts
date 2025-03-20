export interface IRestaurantStatus {
    estaAbierto: boolean;
    estaTemporalmenteCerrado: boolean;
  }
  
  export interface IRestaurantReservationsStats {
    totalReservas: number;
  }
  
  export interface IRestaurantReviewsStats {
    calificacion: number;
    totalReviews: number;
  }
  