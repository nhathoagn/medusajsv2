import { Table, Container, Heading } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid } from "@medusajs/icons"

const BrandsPage = () => {
  const [brands, setBrands] = useState<
    Record<string, string>[]
  >([])
  
  useEffect(() => {
    fetch(`/admin/suppliers`, {
      credentials: "include",
    })
    .then((res) => res.json())
    .then(({ brands: brandsData }) => {
      setBrands(brandsData)
    })
  }, [])


  return (
    <Container>
      <Heading level="h2">Supplier</Heading>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {brands.map((brand) => (
            <Table.Row key={brand.id}>
              <Table.Cell>{brand.id}</Table.Cell>
              <Table.Cell>{brand.contact_name}</Table.Cell>
              <Table.Cell>{brand.contact_email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default BrandsPage

// TODO export configuration
export const config = defineRouteConfig({
    label: "Supplier",
    icon: TagSolid,
  })