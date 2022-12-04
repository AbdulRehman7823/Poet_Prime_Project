import React from 'react'
import SellerNavigation from '../../sellerDashboard/Navigation/SellerNavigation'
import Orders from '../../sellerDashboard/Orders/Orders'
function SellerOrdersPage() {
  return (
    <div>

      <SellerNavigation>
        <Orders></Orders>
      </SellerNavigation>
    </div>
  )
}

export default SellerOrdersPage