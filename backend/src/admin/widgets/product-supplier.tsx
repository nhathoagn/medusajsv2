import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { useEffect, useState } from "react"
import { Container, Heading } from "@medusajs/ui"

const ProductSupplierWidget = ({ 
  data,
}: DetailWidgetProps<AdminProduct>) => {
  const [supplier, setSupplier] = useState<
    Record<string, string> | undefined
  >()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      return
    }

    fetch(`/admin/products/${data.id}/supplier`, {
      credentials: "include",
    })
    .then((res) => res.json())
    .then(({ supplier }) => {
        setSupplier(supplier)
      setLoading(false)
    })
  }, [loading])
  console.log("supplier",supplier)
  return (
    <Container>
      <Heading level="h2">Supplier</Heading>
      {loading && <span>Loading...</span>}
      {supplier && <span>Name: {supplier.contact_name}</span>}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductSupplierWidget