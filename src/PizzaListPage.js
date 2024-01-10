import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function PizzaListPage() {
  const [pizzak, setPizzak] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch('https://pizza.kando-dev.eu/Pizza', {})
      .then((res) => res.json())
      .then((pizzak) => setPizzak(pizzak))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div style={{}}>
          <h2>Pizzák</h2>
          <div className="row">
            {pizzak.map((pizza) => (
              <div key={pizza.id + 4} className="col-sm-3 mb-3">
                <div className="card p-2">
                  <h5 className="text-muted">{pizza.name}</h5>
                  <div className="small">
                    Glutén mentes: {pizza.isGlutenFree ? 'Igen' : 'Nem'}
                  </div>
                  <NavLink key={pizza.id} to={`/Pizza/${pizza.id}`}>
                    <div className="card-body">
                      <img
                        className="img-fluid"
                        style={{ height: '200px', objectFit: 'cover' }}
                        alt="Kép nem található!"
                        src={
                          pizza.kepURL
                            ? pizza.kepURL
                            : 'https://via.placeholder.com/400x800'
                        }
                      />
                    </div>
                  </NavLink>
                  <div className="mt-2">
                    <NavLink key={pizza.id + 1} to={`/mod-pizza/${pizza.id}`}>
                      <button className="btn btn-warning">Módosítás</button>
                    </NavLink>
                    <NavLink key={pizza.id + 2} to={`/del-pizza/${pizza.id}`}>
                      <button className="btn btn-danger ml-2">Törlés</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
