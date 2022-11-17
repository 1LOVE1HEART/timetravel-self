export default function SiteCardList({ rows }) {
  // console.log({ rows });
  return (
    <>
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          {rows.map((el) => {
            return (
              <div
                className="card col-3"
                key={el.sid}
                style={{ width: '285px' }}
              >
                <img src="..." class="card-img-top" alt="..." />
                <div class="card-body">
                  <h4 class="card-title">{el.name}</h4>
                  <h5>{el.site_category_name}</h5>
                  <p class="card-text">
                    {el.city_name}
                    {el.area_name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
